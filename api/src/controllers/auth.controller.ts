import User from "../models/User";
import * as jwt from "jsonwebtoken";
import { redisClient } from "../utils/redis";
import { errorResponse } from "../utils/responses";

class AuthController {
	async login(email: string, password: string) {
		const user = await User.findOne({
			where: { email }
		});

		if (!user) return errorResponse("USER_NOT_FOUND");

		if (user.getDataValue("password") !== password)
			return errorResponse("WRONG_PASSWORD");

		// Generate Token
		const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
		// Save token to redis
		redisClient.set(`${user.getDataValue("email")}-auth_token`, token);
		// Return payload to frontend
		return {
			message: "Success",
			success: true,
			token
		};
	}
}

export default AuthController;
