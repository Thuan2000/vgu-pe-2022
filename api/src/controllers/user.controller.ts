import { errorResponse, generateUsername, successResponse } from "@utils";
import User from "@models/User";
import EmailService from "@services/email.service";
import AuthRepository from "@repositories/auth.repository";

import { IResponse, IUser } from "@graphql/types";
import UserRepository from "@repositories/user.repository";

interface RegisterResp extends IResponse {
	id?: number;
}

class UserController {
	emailer = new EmailService();
	authRepo = new AuthRepository();

	static async addChatId(approvedEmail: string, chatId: string) {
		const user = await User.findOne({ where: { email: approvedEmail } });

		user.setDataValue("chatId", chatId);
		user.save();
	}

	static async getUsers() {
		return await User.findAll();
	}

	static async getUser(id: number) {
		return await User.findByPk(id);
	}

	/**
	 *
	 * @param user UserInput
	 * @returns {...Response, token: string, id: number}
	 */
	async register(user): Promise<RegisterResp> {
		try {
			const userName = generateUsername(user.email);
			const newUser = await User.create({
				...user,
				userName,
				password: UserRepository.encodePassword(user.password)
			});
			newUser.save();

			UserRepository.sendRegistrationEmail(newUser);

			return {
				id: newUser.getDataValue("id"),
				...successResponse()
			};
		} catch (error) {
			console.log(error);
			return errorResponse();
		}
	}

	static async checkEmail(email: string) {
		const user = await User.findOne({ where: { email } });

		return { isExist: !!user };
	}
}

export default UserController;
