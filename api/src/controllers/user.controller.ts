import { errorResponse } from "../utils/responses";
import User from "../models/User";

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
				return errorResponse("DUPLICATE_USER");
			}
			const newUser = await User.create({ ...user });
			newUser.save();
			return {
				message: `SUCCESS`,
				success: true
			};
		} catch (error) {
			console.log(error);
			return errorResponse("SOMETHING_WENT_WRONG");
		}
	}
}

export default UserController;
