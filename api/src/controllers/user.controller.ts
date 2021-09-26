import bcrypt from "bcrypt";

import { errorResponse, getUserName, successResponse } from "@utils";
import User from "@models/User";
import EmailService from "@services/email.service";
import AuthRepository from "@repositories/auth.repository";
import {
	EMailTemplates,
	EMAIL_MESSAGES,
	EMAIL_SUBJECTS
} from "@utils/email_constants";

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
	async register(user: any) {
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
				password: this.encodePassword(user.password)
			});
			newUser.save();

			const token = this.authRepo.storeUserToRedis(newUser);

			this.sendRegistrationEmail(newUser);

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

	/**
	 * This will send registration email
	 * @param user IUser
	 */
	private sendRegistrationEmail(user) {
		this.emailer.sendEmail(user.email, {
			name: getUserName(user),
			message: EMAIL_MESSAGES.REGISTERED,
			subject: EMAIL_SUBJECTS.REGISTERED,
			template: EMailTemplates.REGISTRATION
		});
	}

	private encodePassword(password: string) {
		const salt = bcrypt.genSaltSync();
		const encodedPass = bcrypt.hashSync(password, salt);

		return encodedPass;
	}
}

export default UserController;
