import bcrypt from "bcrypt";

import User from "../models/User";
import { errorResponse, successResponse } from "../utils/responses";
import AuthRepository from "../repositories/auth.repository";

class AuthController {
	authRepo = new AuthRepository();

	async login(email: string, password: string) {
		try {
			const user = await User.findOne({
				where: { email }
			});

			if (!user) return errorResponse("USER_NOT_FOUND");

			const isPasswordMatch = bcrypt.compareSync(
				password,
				user.getDataValue("password")
			);

			if (!isPasswordMatch) return errorResponse("WRONG_PASSWORD");

			// Save token to redis
			const token = this.authRepo.storeUserToRedis(user);

			// Return payload to frontend
			return {
				...successResponse(),
				token,
				role: user.getDataValue("role")
			};
		} catch (err) {
			console.log(err);
		}
	}
}

export default AuthController;
