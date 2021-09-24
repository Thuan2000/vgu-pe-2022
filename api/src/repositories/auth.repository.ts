import jwt from "jsonwebtoken";
import { redisClient } from "../services/redis.service";
import { AUTH_CONSTANTS } from "../utils";

class AuthRepository {
	/**
	 *
	 * @param user: IUser
	 * @return token: string
	 */
	getToken(user) {
		// Creating token
		const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);

		return token;
	}

	/**
	 *
	 * @param user: IUser see from .graphql
	 * @return token: string
	 */
	storeUserToRedis(user) {
		const token = this.getToken(user);

		redisClient.set(
			`${user.email}-${AUTH_CONSTANTS.AUTH_CONSTANT_KEY}`,
			token
		);

		return token;
	}
}

export default AuthRepository;
