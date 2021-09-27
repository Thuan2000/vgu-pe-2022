import { errorResponse, successResponse } from "@utils";
import User from "@models/User";
import EmailService from "@services/email.service";
import AuthRepository from "@repositories/auth.repository";

import { IUser } from "@graphql/types";
import UserRepository from "@repositories/user.repository";

class UserController {
	emailer = new EmailService();
	authRepo = new AuthRepository();

	async getUsers() {
		return await User.findAll();
	}

	async getUser(id: number) {
		return await User.findByPk(id);
	}

	/**
	 *
	 * @param user UserInput
	 * @returns {...Response, token: string, id: number}
	 */
	async register(user: IUser) {
		try {
			const sameEmailUser = await User.findOne({
				where: { email: user.email }
			});

			if (sameEmailUser) {
				return {
					token: null,
					id: sameEmailUser.getDataValue("id"),
					...errorResponse("USER_EXIST")
				};
			}

			const newUser = await User.create({
				...user,
				password: UserRepository.encodePassword(user.password)
			});
			newUser.save();

			const token = this.authRepo.storeUserToRedis(newUser);

			UserRepository.sendRegistrationEmail(newUser);

			return {
				id: newUser.getDataValue("id"),
				token,
				...successResponse()
			};
		} catch (error) {
			console.log(error);
			return { token: null, id: null, ...errorResponse() };
		}
	}
}

export default UserController;
