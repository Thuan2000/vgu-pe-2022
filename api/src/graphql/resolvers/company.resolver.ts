/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import UserController from "@controllers/user.controller";
import {
	EEMailTemplates,
	EMAIL_MESSAGES,
	EMAIL_SUBJECTS,
	errorResponse
} from "@utils";
import CompanyController from "@controllers/company.controller";
import { EUserRole } from "@utils/enums";
import EmailService from "@services/email.service";

export const Query = {
	unapprovedCompanies: (_, { input }) =>
		CompanyController.getUnapproved(input),
	company: (_, { slug }) => CompanyController.getCompany(slug),
	companies: (_, { input }) => CompanyController.getCompanies(input)
};

export const Mutation = {
	seedCompany: (_, { input }) => CompanyController.seedCompany(input),
	isCompanyFullInfo: (_, { id }) => CompanyController.checkIsFullInfo(id),
	getCompanyNameSuggestion: (_, { name, limit }) =>
		CompanyController.getNameSuggestion(name, limit),
	// @NOTES URGENT : Follow this
	approveCompany: (_, { id, approverId, expDate, isSeedData }) =>
		CompanyController.approveCompany(id, approverId, expDate, isSeedData),
	updateCompany: (_, { id, input }) =>
		CompanyController.updateCompany(id, input),
	/**
	 * Company registered along with the owner
	 * @param _
	 * @param param1 CompanyRegisterInput
	 * @return AuthResponse
	 */
	companySignup: async (
		_,
		{
			input: {
				licenseFiles,
				licenseNumber,
				isSubscribeEmail,
				companyName,
				companyShortName,
				...owner
			}
		}
	) => {
		// @NOTES URGENT : This is wrong flow need to refactor
		const companyController = new CompanyController();
		const role = EUserRole.COMPANY_OWNER;

		/* 
			owner.firstName
			owner.lastName
			owner.email
			owner.password
		*/
		// TODO: check if the user and company exist first before create the user and company

		// Creating the owner
		const { id: ownerId, success, message } = await UserController.register(
			{
				role,
				...owner
			}
		);

		// Problem on creating the user
		if (!success) return errorResponse(message);

		// Creating company
		const newCompanyResp = await companyController.register({
			// Used to be deleted if company is duplicate
			ownerId,
			licenseFiles,
			licenseNumber,
			isSubscribeEmail,
			companyName,
			companyShortName
		});

		// Send email to new user
		EmailService.sendEmail(owner?.email, {
			message: EMAIL_MESSAGES.REGISTERED,
			subject: EMAIL_SUBJECTS.REGISTERED,
			name: owner?.name,
			template: EEMailTemplates.REGISTRATION
		});

		return {
			...newCompanyResp
		};
	}
};
