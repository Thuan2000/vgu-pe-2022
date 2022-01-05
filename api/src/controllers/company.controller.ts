/* eslint-disable @typescript-eslint/camelcase */
/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

//  static async getCompanies({
// 	limit,
// 	offset,
// 	establishmentDate,
// 	...input
// }: IFetchCompanyInput) {
// 	const {
// 		count: dataCount,
// 		rows: companies
// 	} = await Company.findAndCountAll({
// 		limit,
// 		offset,
// 		where: {
// 			approved: 1,
// 			...(establishmentDate
// 				? {
// 						establishmentDate: {
// 							[Op.gte]: establishmentDate
// 						}
// 					}
// 				: {}),
// 			...input
// 		},
// 		nest: true,
// 		raw: true,
// 		attributes: [
// 			"id",
// 			"name",
// 			"slug",
// 			CompanyFunction.sequelizeFnGetBranchAmount() as any,
// 			CompanyFunction.sequelizeFnGetMainProducts() as any,
// 			CompanyFunction.sequelizeFnGetCoverImage() as any,
// 			"location",
// 			"industryId",
// 			"businessTypeIds",
// 			"establishmentDate"
// 			// "responseTime"
// 		],
// 		include: [
// 			{
// 				model: CompanySubscription,
// 				as: "subscription",
// 				attributes: ["startAt", "monthAmount"],
// 				include: [
// 					{
// 						model: Subscription,
// 						as: "subscriptionDetail"
// 					}
// 				]
// 			}
// 		]
// 	});

// 	const hasMore =
// 		offset + companies.length < dataCount && companies.length === limit;

// 	return {
// 		companies,
// 		pagination: {
// 			dataCount,
// 			hasMore
// 		}
// 	};
// }

import {
	generateSlug,
	errorResponse,
	successResponse,
	successResponseWithPayload,
	DEFAULT_SUBSCRIPTION_ID
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
import CompanyFunction from "@/functions/company.function";

type IRegisterResp = {
	success: boolean;
	message: string;
	userNewToken?: string;
};

class CompanyController {
	s3 = new S3();
	email = new EmailService();

	// static async getCompanies({ offset, limit, searchValue, ...input }) {
	// 	const queryBody = {
	// 		query: CompanyRepository.getSearchQuery(searchValue, input)
	// 	};

	// 	const { dataCount: count, companies } = await Company.getMatchSearched(
	// 		queryBody
	// 	);

	// 	const hasMore =
	// 		offset + companies.length < count && companies.length === limit;

	// 	return {
	// 		companies,
	// 		pagination: {
	// 			dataCount: count,
	// 			hasMore
	// 		}
	// 	};
	// }

	static async getCompanies({
		limit,
		offset,
		establishmentDate,
		...input
	}: IFetchCompanyInput) {
		try {
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
					CompanyFunction.sequelizeFnGetCoverImage() as any,
					CompanyFunction.sequelizeFnGetBranchAmount() as any,
					CompanyFunction.sequelizeFnGetMainProducts() as any,
					"location",
					"industryId",
					"businessTypeIds",
					"establishmentDate",
					"createdAt",
					"updatedAt"
				],
				include: [
					{
						model: CompanySubscription,
						as: "subscription",
						attributes: ["startAt", "monthAmount"],
						include: [
							{
								model: Subscription,
								as: "subscriptionDetail"
							}
						]
					},
					{
						model: User,
						as: "approver"
					}
				]
			});

			const hasMore =
				offset + companies.length < dataCount &&
				companies.length === limit;

			return {
				companies,
				pagination: {
					dataCount,
					hasMore
				}
			};
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
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

			// Setting company subscription
			await CompanySubscription.create({
				companyId: id,
				subscriptionId: DEFAULT_SUBSCRIPTION_ID,
				monthAmount: 3,
				startAt: new Date().getTime()
			});

			return successResponse();
		} catch (e) {
			console.log(e);

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
