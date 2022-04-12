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
	getCurrentDateInMilis,
	getFirstTrialSubscriptionConfig,
	getNextMonthInMs
} from "@utils";
import Company from "@models/Company";
import S3 from "@services/s3.service";
import EmailService from "@services/email.service";
import UserRepository from "@repositories/user.repository";
import User from "@models/User";
import {
	IFetchUnapprovedCompaniesInput,
	IRole,
	ISeedCompanyInput,
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
	static async seedCompany({
		firstName,
		lastName,
		email,
		companyName,
		companyShortName,
		licenseNumber
	}: ISeedCompanyInput) {
		try {
			/**
			 * Create company first
			 */
			const company = await Company.create({
				name: companyName,
				shortName: companyShortName,
				licenseNumber,
				approved: true,
				isSeedData: true
			});
			const companyId = company.getDataValue("id");
			company.setDataValue(
				"slug",
				generateSlug(companyName, company.getDataValue("id"))
			);

			company.save();

			const firstSubscription = getFirstTrialSubscriptionConfig(
				companyId,
				getNextMonthInMs() as any
			);
			// Setting company subscription
			await CompanySubscription.create(firstSubscription);

			ChatService.createAccount({
				compId: companyId,
				compName: companyName,
				email: email,
				phoneNumber: ""
			});

			/**
			 * Create user data
			 */
			const user = await User.create({
				isSeedData: true,
				firstName,
				lastName,
				firstLogin: false,
				password: UserRepository.encodePassword(
					"PasswordIsPassword-123"
				),
				role: "COMPANY_OWNER" as IRole,
				email,
				phoneNumber: "",
				companyId
			});

			return successResponse();
		} catch (error) {
			console.error(error);
			return errorResponse(error.toString());
		}
	}
	static async getCompanies({ offset, limit, searchValue, ...input }) {
		const queryBody = {
			size: limit,
			from: offset,
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

	static async getCompany(slugOrId: string | number) {
		try {
			const company = await Company.findOne({
				where: {
					[typeof slugOrId === "string" ? "slug" : "id"]: slugOrId
				},
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
						attributes: ["startAt", "endAt", "subscriptionAttempt"],
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
					association: Company.hasOne(User, {
						foreignKey: "companyId"
					})
				}
			]
		});

		return companies;
	}

	static async approveCompany(
		id: number,
		approverId: number,
		expDate: Date,
		isSeedData = false
	) {
		try {
			const resp = await Company.update(
				{ approved: 1, approverId, isSeedData },
				{ where: { id } }
			);

			const data = await Company.findByPk(id, {
				include: [{ model: User, as: "owner" }]
			});

			if (!data) return errorResponse("");
			const company: any = data.toJSON();

			const firstSubscription = getFirstTrialSubscriptionConfig(
				company.id,
				expDate
			);
			// Setting company subscription
			await CompanySubscription.create(firstSubscription);

			const owner = company.owner;

			ChatService.createAccount({
				// For credential
				compId: company.id,
				// For credential and ui info
				compName: company.name,
				// For ui info
				email: owner.email,
				phoneNumber: owner.phoneNumber
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
			console.error(e);
			return errorResponse(e.toString());
		}
	}

	static async updateCompany(id: number, input: IUpdateCompanyDetailsInput) {
		try {
			const resp = await Company.update(input, {
				where: { id }
			});

			const company = (
				await Company.findByPk(id, {
					include: [
						{
							model: CompanySubscription,
							as: "subscription",
							attributes: [
								"startAt",
								"endAt",
								"subscriptionAttempt"
							],
							include: [
								{
									model: Subscription,
									as: "subscriptionDetail",
									attributes: [
										"nameEn",
										"nameVn",
										"monthlyPrice"
									]
								}
							]
						}
					]
				})
			).toJSON();

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
		companyName,
		companyShortName
	}): Promise<IRegisterResp> {
		try {
			const duplicateCompany = await Company.findOne({
				where: {
					name: companyName,
					licenseNumber
				},
				attributes: ["id"]
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
				licenseNumber,
				licenseFiles,
				isSubscribeEmail,
				name: companyName,
				shortName: companyShortName
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
			const company = await Company.findByPk(approvedCompId, {
				include: [
					{
						model: CompanySubscription,
						as: "subscription",
						attributes: ["startAt", "endAt", "subscriptionAttempt"],
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

			company.set("chatId", chatId);
			await company.save();

			Company.updateEsCompany(approvedCompId, company.toJSON());

			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}
}

export default CompanyController;
