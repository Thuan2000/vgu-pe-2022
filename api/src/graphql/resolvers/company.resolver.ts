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
		_: any,
		{
			input: {
				licenseFiles,
				licenseNumber,
				companyName,
				countryCode,
				...owner
			}
		}
	) => {
		const companyController = new CompanyController();
		const userController = new UserController();
		const role = EUserRole.COMPANY_OWNER;
		const {
			id: ownerId,
			success,
			message,
			token
		} = await userController.register({
			role,
			...owner
		});

		// Problem on creating the user
		if (!success) return errorResponse(message);

		// Creating company
		return {
			token,
			role,
			...(await companyController.register({
				ownerId,
				licenseFiles,
				licenseNumber,
				companyName
			}))
		};
	}
};
