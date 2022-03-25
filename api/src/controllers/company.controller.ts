/* eslint-disable @typescript-eslint/camelcase */
/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import {
	generateSlug,
	errorResponse,
	successResponse,
	successResponseWithPayload,
	TRIAL_SUBSCRIPTION_ID,
	EEMailTemplates,
	EMAIL_MESSAGES,
	EMAIL_SUBJECTS,
	ADMIN_EMAIL_ADDRESS,
	getCurrentDateInMilis
} from "@utils";
import Company from "@models/Company";
import S3 from "@services/s3.service";
import EmailService from "@services/email.service";
import UserRepository from "@repositories/user.repository";
import User from "@models/User";
import {
	IFetchUnapprovedCompaniesInput,
	IUpdateCompanyDetailsInput
} from "@graphql/types";
import CompanyRepository from "@repositories/company.repository";
import CompanySubscription from "../models/CompanySubscription";
import ChatService from "@services/chat.service";
import Subscription from "@models/Subscription";

type IRegisterResp = {
	success: boolean;
	message: string;
	userNewToken?: string;
};

class CompanyController {
	static async getCompanies({ offset, limit, searchValue, ...input }) {
		const queryBody = {
			query: CompanyRepository.getSearchQuery(searchValue, input)
		};

		const { dataCount: count, companies } = await Company.getMatchSearched(
			queryBody
		);

		const hasMore =
			offset + companies.length < count && companies.length === limit;

		return {
			companies,
			pagination: {
				dataCount: count,
				hasMore
			}
		};
	}

	static async checkIsFullInfo(id: number) {
		try {
			const comp = await Company.findByPk(id, {
				attributes: ["isFullInfo"]
			});

			return comp.getDataValue("isFullInfo");
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	static async getCompany(slug: string) {
		try {
			const company = await Company.findOne({
				where: { slug },
				include: [
					{
						model: User,
						as: "owner",
						attributes: [
							"firstName",
							"lastName",
							"email",
							"phoneNumber"
						]
					},
					{
						model: CompanySubscription,
						as: "subscription",
						attributes: ["startAt", "endAt"],
						include: [
							{
								model: Subscription,
								as: "subscriptionDetail",
								attributes: ["nameEn", "nameVn", "monthlyPrice"]
							}
						]
					}
				]
			});
			console.log(company);

			return company;
		} catch (e) {
			console.log(e);
			return errorResponse(e);
		}
	}

	static async getUnapproved(input: IFetchUnapprovedCompaniesInput) {
		const companies = await Company.findAll({
			where: {
				approved: 0
			},
			include: [
				{
					model: User,
					association: Company.belongsTo(User, {
						foreignKey: "ownerId"
					})
				}
			]
		});

		return companies;
	}

	static async approveCompany(
		id: number,
		approverId: number,
		expDate: number
	) {
		try {
			// const company = Company.findByPk(id);
			const resp = await Company.update(
				{ approved: 1, approverId },
				{ where: { id } }
			);

			const data = await Company.findByPk(id, {
				include: [{ model: User, as: "owner" }]
			});

			if (!data) return errorResponse("");
			const company: any = data.toJSON();

			Company.updateEsCompany(id, company);

			// Setting company subscription
			await CompanySubscription.create({
				companyId: id,
				subscriptionId: TRIAL_SUBSCRIPTION_ID,
				firstTimeSubscribeAt: new Date().getTime(),
				startAt: getCurrentDateInMilis(),
				endAt: expDate,
				subscriptionAttempt: 0
			});

			const owner = company.owner;

			ChatService.createAccount({
				compId: company.id,
				compName: company.name,
				email: owner.email,
				phoneNumber: owner.phoneNumber,
				password: owner.email
			});

			EmailService.sendEmail(company.owner.email, {
				message: EMAIL_MESSAGES.VERIFIED,
				subject: EMAIL_SUBJECTS.VERIFIED,
				name: `${company.owner.firstName} ${company.owner.lastName}`,
				password: owner.password,
				template: EEMailTemplates.VERIFICATION
			});

			return successResponse();
		} catch (e) {
			console.log(e);

			return errorResponse();
		}
	}

	static async updateCompany(id: number, input: IUpdateCompanyDetailsInput) {
		try {
			const resp = await Company.update(input, {
				where: { id }
			});

			const company = (await Company.findByPk(id)).toJSON();

			Company.updateEsCompany(id, company);

			return successResponseWithPayload(company);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async getNameSuggestion(inputName: string, limit: number) {
		const queryBody = {
			query: CompanyRepository.nameSuggestionQuery(inputName),
			highlight: {
				tags_schema: "styled",
				fields: {
					name: {}
				}
			},
			_source: ["name"],
			size: limit
		};
		const comps = await Company.getNameSearchSuggestion(queryBody);

		const suggestions = comps.map(br => ({
			name: br?._source?.name,
			highlightedName: br?.highlight?.name[0]
		}));

		return suggestions;
	}

	/**
	 *
	 * @param args CompanyRegisterInput!
	 * @returns response
	 */
	async register({
		ownerId,
		licenseFiles,
		licenseNumber,
		isSubscribeEmail,
		companyName
	}): Promise<IRegisterResp> {
		try {
			const duplicateCompany = await Company.findOne({
				where: {
					name: companyName,
					licenseNumber
				}
			});

			if (duplicateCompany) {
				// Delete the user
				User.destroy({
					where: {
						attribute: "id",
						val: ownerId
					}
				});
				return errorResponse("COMPANY_EXIST");
			}
			const newComp = await Company.create({
				ownerId,
				licenseNumber,
				licenseFiles,
				isSubscribeEmail,
				name: companyName
			});
			newComp.setDataValue(
				"slug",
				generateSlug(companyName, newComp.getDataValue("id"))
			);

			await newComp.save();

			Company.insertIndex(newComp.toJSON());

			// Setting user company id
			await UserRepository.setCompanyId(
				ownerId,
				newComp.getDataValue("id")
			);

			const message = `(${companyName}) has been registered to our platform`;
			EmailService.sendEmail(ADMIN_EMAIL_ADDRESS, {
				message,
				template: EEMailTemplates.NEW_COMPANY_REGISTERED,
				subject: "New Company",
				name: "SDConnect"
			});

			return successResponse();
		} catch (error) {
			console.error(error);
			return errorResponse();
		}
	}

	static async addChatId(approvedCompId: number, chatId: string) {
		try {
			const company = await Company.findByPk(approvedCompId);

			company.set("chatId", chatId);
			await company.save();

			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}
}

export default CompanyController;
