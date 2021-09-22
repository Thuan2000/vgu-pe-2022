import { errorResponse, successResponse } from "../utils";
import User from "../models/User";
import EmailService from "../services/email.service";

class UserController {
	emailer = new EmailService();

	async getUsers() {
		return await User.findAll();
	}

	async getUser(id: number) {
		return await User.findByPk(id);
	}

	/**
	 *
	 * @param user UserInput
	 * @returns Response
	 */
	async storeUser(user: any) {
		try {
			const sameEmailUser = await User.findOne({
				where: { email: user.email }
			});

			if (sameEmailUser) {
				return {
					id: sameEmailUser.getDataValue("id"),
					...errorResponse("USER_EXIST")
				};
			}

			const newUser = await User.create({ ...user });
			newUser.save();

			// @TODO make this code cleaner
			const emailMessage =
				"We already received your registration and will contact you soon";
			const targetName = `${user.firstName} ${user.lastName}`;
			this.emailer.sendEmail(user.email, {
				name: targetName,
				message: emailMessage
			});
			return { id: newUser.getDataValue("id"), ...successResponse() };
		} catch (error) {
			console.log(error);
			return { id: null, ...errorResponse() };
		}
	}
}

export default UserController;
