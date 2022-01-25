import jwt from "jsonwebtoken";
import Crypto from "crypto";
import RedisService from "@services/redis.service";
import { HOUR_IN_SECONDS } from "@utils/constants";

class AuthRepository {
	/**
	 *
	 * @param user: IUser
	 * @return token: string
	 */
	static generateJwtToken(user) {
		// Creating token
		const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
		return token;
	}

	static async generateCryptoToken() {
		// Creating crypto token

		const keys = await Crypto.randomBytes(20);

		return keys.toString("hex");
	}

	static async saveCryptoTokenInRedis(token: string, email: string) {
		RedisService.save(token, email, HOUR_IN_SECONDS);
	}

	static async getEmailFromCryptoToken(token: string) {
		const email = await RedisService.get(token);

		return email;
	}

	static async removeTokenFromDb(token: string) {
		RedisService.remove(token);
	}

	static async validateToken(token: string) {
		const email = await RedisService.get(token);

		return !!email;
	}
}

export default AuthRepository;
