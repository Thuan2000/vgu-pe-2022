import jwt from "jsonwebtoken";

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
}

export default AuthRepository;
