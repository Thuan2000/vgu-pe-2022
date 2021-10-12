/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

// TODO: handle the company registration (mutation companySignup). (See codes below from: https://www.apollographql.com/docs/apollo-server/data/file-uploads/)

import UserController from "@controllers/user.controller";
import { errorResponse } from "@utils";
import CompanyController from "@controllers/company.controller";
import { EUserRole } from "@utils/enums";

export const Mutation = {
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

		return {
			token: userNewToken,
			role,
			...newCompanyResp
		};
	}
};
