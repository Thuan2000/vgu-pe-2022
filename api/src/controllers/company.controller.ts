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
import UploaderRepository from "@repositories/uploads.repository";
import S3 from "@services/s3.service";
import EmailService from "@services/email.service";
import UserRepository from "@repositories/user.repository";
import User from "@models/User";
import { IUpdateCompanyDetailsInput } from "@graphql/types";

type IRegisterResp = {
	success: boolean;
	message: string;
	userNewToken?: string;
};

class CompanyController {
	s3 = new S3();
	email = new EmailService();

	static async updateCompany(id: number, input: IUpdateCompanyDetailsInput) {
		try {
			const [updatedId] = await Company.update(input, {
				where: { id }
			});

			console.log(updatedId);
			const data = await Company.findByPk(updatedId);
			console.log(data);

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
				name: companyName,
				slug: generateSlug(companyName)
			});

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
