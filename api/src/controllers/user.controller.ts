import {
	createSuccessResponse,
	errorResponse,
	generateFirstTimePassword
} from "@utils";
import User from "@models/User";
import EmailService from "@services/email.service";
import AuthRepository from "@repositories/auth.repository";

import { IResponse } from "@graphql/types";
import UserRepository from "@repositories/user.repository";
import Company from "@models/Company";

interface RegisterResp extends IResponse {
	id?: number;
}

class UserController {
	emailer = new EmailService();
	authRepo = new AuthRepository();

	static async getUsers() {
		return await User.findAll();
	}

	static async getUser(id: number) {
		return await User.findByPk(id);
	}

	/**
	 *
	 * @param user UserInput
	 * @returns {...CreateResponse}
	 */
	async register(user): Promise<RegisterResp> {
		try {
			// First login is set to true as default value on migration
			const newUser = await User.create({
				...user,
				password: generateFirstTimePassword()
			});

			UserRepository.sendRegistrationEmail(newUser);

			return createSuccessResponse(newUser.getDataValue("id"));
		} catch (error) {
			console.log(error);
			return errorResponse();
		}
	}

	static async isVerifiedUser(email: string) {
		try {
			const user: any = await User.findOne({
				where: { email },
				attributes: ["firstLogin"],
				include: [
					{ model: Company, as: "company", attributes: ["approved"] }
				]
			});

			return {
				isExist: !!user,
				isApproved: !!user?.company?.approved,
				isFirstLogin: !!user?.firstLogin
			};
		} catch (error) {
			console.error(error);
			return {
				isApproved: false,
				isFirstLogin: false
			};
		}
	}

	static async checkEmail(email: string) {
		const user = await User.findOne({
			where: { email },
			attributes: ["id"]
		});

		return { isExist: !!user };
	}
}

export default UserController;
