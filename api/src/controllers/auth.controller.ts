import bcrypt from "bcrypt";

import { errorResponse, successResponse } from "@utils/responses";
import User from "@models/User";
import AuthRepository from "@repositories/auth.repository";
import { ICompany, IUser } from "@graphql/types";
import Company from "@models/Company";
import { Model } from "sequelize/types";

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

	async loggedInUser(user: IUser) {
		const userCompany: Model<ICompany> = await Company.findByPk(
			user.companyId
		);

		return { user, company: userCompany };
	}
}

export default AuthController;
