import bcrypt from "bcrypt";
import { IUser } from "@graphql/types";
import EmailService from "@services/email.service";

import {
	EEMailTemplates,
	EMAIL_MESSAGES,
	EMAIL_SUBJECTS
} from "@utils/email_constants";
import { getUserName } from "@utils/functions";
import { Model } from "sequelize";
import User from "@models/User";
import AuthRepository from "./auth.repository";

class UserRepository {
	static authRepo = new AuthRepository();

	/**
	 * This will send registration email
	 * @param user IUser
	 */
	public static sendRegistrationEmail(user: Model<IUser>) {
		EmailService.sendEmail(user.getDataValue("email"), {
			name: getUserName(user),
			message: EMAIL_MESSAGES.REGISTERED,
			subject: EMAIL_SUBJECTS.REGISTERED,
			template: EEMailTemplates.REGISTRATION
		});
	}

	public static encodePassword(password: string) {
		const salt = bcrypt.genSaltSync();
		const encodedPass = bcrypt.hashSync(password, salt);

		return encodedPass;
	}

	/**
	 * This will set the user companyId
	 * @param userId The user that will updated
	 * @param companyId The value
	 */
	static async setCompanyId(userId: number, companyId: number) {
		const user = await User.findByPk(userId);

		user.set("companyId", companyId);
		user.save();
	}
}

export default UserRepository;
