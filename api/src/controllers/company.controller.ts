/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */
import { generateSlug } from "../utils";
import Company from "../models/Company";
import { uploadCompanyLicenses } from "../repositories/upload-file.repository";
import { errorResponse, successResponse } from "../utils/responses";
import S3 from "../services/s3.service";
import EmailService from "../services/email.service";

function setCompanyLicenses(data: Promise<any>[], company: Company) {
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

class CompanyController {
	s3 = new S3();
	email = new EmailService();

	/**
	 *
	 * @param args CompanyRegisterInput!
	 * @returns response
	 */
	async register({ ownerId, licenseFiles, licenseNumber, companyName }) {
		try {
			const duplicateCompany = await Company.findOne({
				where: {
					name: companyName,
					licenseNumber
				}
			});

			if (duplicateCompany) return errorResponse("COMPANY_EXIST");

			// This will return [Promise]
			const data = await uploadCompanyLicenses(companyName, licenseFiles);
			const newCompany = await Company.create({
				ownerId,
				licenseNumber,
				name: companyName,
				slug: generateSlug(companyName)
			});

			setCompanyLicenses(data, newCompany);
			return successResponse();
		} catch (error) {
			console.log(error);
			return errorResponse();
		}
	}
}

export default CompanyController;
