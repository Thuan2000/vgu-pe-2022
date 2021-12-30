/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */
import {
	generateSlug,
	errorResponse,
	successResponse,
	successResponseWithPayload
} from "@utils";
import Company from "@models/Company";
import S3 from "@services/s3.service";
import EmailService from "@services/email.service";
import UserRepository from "@repositories/user.repository";
import User from "@models/User";
import {
	IFetchCompanyInput,
	IFetchUnapprovedCompaniesInput,
	IUpdateCompanyDetailsInput
} from "@graphql/types";
import { Op, Sequelize } from "sequelize";
import CompanyRepository from "@repositories/company.repository";
import Subscription from "../models/Subscription";
import CompanySubscription from "../models/CompanySubscription";

type IRegisterResp = {
	success: boolean;
	message: string;
	userNewToken?: string;
};

class CompanyController {
	s3 = new S3();
	email = new EmailService();

	static async getCompanies({
		limit,
		offset,
		establishmentDate,
		...input
	}: IFetchCompanyInput) {
		const {
			count: dataCount,
			rows: companies
		} = await Company.findAndCountAll({
			limit,
			offset,
			where: {
				approved: 1,
				...(establishmentDate
					? {
							establishmentDate: {
								[Op.gte]: establishmentDate
							}
					  }
					: {}),
				...input
			},
			nest: true,
			raw: true,
			attributes: [
				"id",
				"name",
				"slug",
				CompanyRepository.sequelizeFnGetBranchAmount() as any,
				CompanyRepository.sequelizeFnGetMainProducts() as any,
				CompanyRepository.sequelizeFnGetCoverImage() as any,
				"location",
				"industryId",
				"businessTypeIds",
				"establishmentDate"
				// "responseTime"
			],
			include: [
				{
					model: CompanySubscription,
					as: "subscription",
					attributes: ["startAt", "endAt", "monthAmount"],
					include: [
						{
							model: Subscription,
							as: "subscriptionDetail"
						}
					]
				}
			]
		});

		console.log(companies);

		const hasMore =
			offset + companies.length < dataCount && companies.length === limit;

		return {
			companies,
			pagination: {
				dataCount,
				hasMore
			}
		};
	}

	static async getCompany(slug: string) {
		try {
			const company = await Company.findOne({
				where: { slug }
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
					association: Company.belongsTo(User, {
						foreignKey: "ownerId"
					})
				}
			]
		});

		return companies;
	}

	static async approveCompany(id: number, approverId: number) {
		try {
			await Company.update(
				{ approved: 1, approverId },
				{ where: { id } }
			);
			return successResponse();
		} catch (e) {
			return errorResponse();
		}
	}
	static async updateCompany(id: number, input: IUpdateCompanyDetailsInput) {
		try {
			const [updatedId] = await Company.update(input, {
				where: { id }
			});

			const data = await Company.findByPk(updatedId);

			return successResponseWithPayload(data);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
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

			// This will return [Promise]
			const newCompany = await Company.create({
				ownerId,
				licenseNumber,
				licenseFiles,
				name: companyName
			});

			newCompany.setDataValue(
				"slug",
				generateSlug(companyName, newCompany.getDataValue("id"))
			);

			await newCompany.save();

			// Setting user company id
			const userNewToken = await UserRepository.setCompanyId(
				ownerId,
				newCompany.getDataValue("id")
			);

			return {
				userNewToken,
				...successResponse()
			};
		} catch (error) {
			console.log(error);
			return errorResponse();
		}
	}
}

export default CompanyController;
