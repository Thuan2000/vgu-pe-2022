/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

// TODO: handle the company registration (mutation companySignup). (See codes below from: https://www.apollographql.com/docs/apollo-server/data/file-uploads/)

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
	getCompanyNameSuggestion: (_, { name, limit }) =>
		CompanyController.getNameSuggestion(name, limit),
	// @NOTES URGENT : Follow this
	approveCompany: (_, { id, approverId }) =>
		CompanyController.approveCompany(id, approverId),
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
		{ input: { licenseFiles, licenseNumber, companyName, ...owner } }
	) => {
		// @NOTES URGENT : This is wrong flow need to refactor
		const email = new EmailService();

		const companyController = new CompanyController();
		const userController = new UserController();
		const role = EUserRole.COMPANY_OWNER;

		// @TODO check if the user and company exist first before create the user and company

		// Creating the owner
		const { id: ownerId, success, message } = await userController.register(
			{
				role,
				...owner
			}
		);

		// Problem on creating the user
		if (!success) return errorResponse(message);

		// Creating company
		const {
			userNewToken,
			...newCompanyResp
		} = await companyController.register({
			ownerId,
			licenseFiles,
			licenseNumber,
			companyName
		});

		// Send email to new user
		email.sendEmail(owner?.email, {
			message: EMAIL_MESSAGES.REGISTERED,
			subject: EMAIL_SUBJECTS.REGISTERED,
			name: owner?.name,
			template: EEMailTemplates.REGISTRATION
		});

		return {
			token: userNewToken,
			role,
			...newCompanyResp
		};
	}
};
