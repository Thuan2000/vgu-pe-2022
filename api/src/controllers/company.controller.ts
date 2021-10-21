/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */
import { generateSlug, errorResponse, successResponse } from "@utils";
import Company from "@models/Company";
import { uploadCompanyLicenses } from "@repositories/uploads.repository";
import S3 from "@services/s3.service";
import EmailService from "@services/email.service";
import UserRepository from "@repositories/user.repository";
import User from "@models/User";

function setCompanyLicenses(data: Promise<unknown>[], company: Company) {
	let doneCount = 0;

	data.forEach(async d => {
		d.then(file => {
			++doneCount;
			const currentLicenseFiles =
				company.getDataValue("licenseFiles") || [];
			company.set("licenseFiles", [...currentLicenseFiles, file]);

			if (doneCount >= data.length - 1) {
				company.save();
			}
		});
	});
}

type IRegisterResp = {
	success: boolean;
	message: string;
	userNewToken?: string;
};

class CompanyController {
	s3 = new S3();
	email = new EmailService();

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
				name: companyName,
				slug: generateSlug(companyName)
			});

			// Setting user company id
			const userNewToken = await UserRepository.setCompanyId(
				ownerId,
				newCompany.getDataValue("id")
			);

			// Setting company Licenses asynchronously
			const companyLicenses = await uploadCompanyLicenses(
				companyName,
				licenseFiles
			);
			setCompanyLicenses(companyLicenses, newCompany);
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