import User from "../models/User";
import * as jwt from "jsonwebtoken";
import { email } from "envalid";

class UserController {
	async getUsers() {
		return await User.findAll();
	}

	async getUser(id: number) {
		return await User.findByPk(id);
	}

	async storeUser(user: any) {
		try {
			const sameEmailUser = await User.findOne({
				where: { email: user.email }
			});

			if (sameEmailUser) {
				return {
					message: "Duplicate user",
					success: false
				};
			}
			const newUser = await User.create({ ...user });
			newUser.save();
			return {
				message: `SUCCESS`,
				success: true
			};
		} catch (error) {
			console.log(error);
			return {
				message: `Something went wrong`,
				success: false
			};
		}
	}
}

export default UserController;
