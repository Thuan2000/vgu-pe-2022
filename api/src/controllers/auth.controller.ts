import bcrypt from "bcrypt";

import { errorResponse, successResponse } from "@utils/responses";
import User from "@models/User";
import AuthRepository from "@repositories/auth.repository";
import { ICompany, ILoginInput, IUser } from "@graphql/types";
import Company from "@models/Company";
import { Model } from "sequelize/types";

class AuthController {
	authRepo = new AuthRepository();

	async login({ email, password }: ILoginInput) {
		try {
			const user = await User.findOne({
				where: { email },
				include: [{ model: Company, as: "company" }]
			});
			if (!user) return errorResponse("USER_NOT_FOUND");

			const company = user.getDataValue("company");

			if (!company || !company.approved)
				return errorResponse("COMPANY_NOT_APPROVED");

			const isPasswordMatch = bcrypt.compareSync(
				password,
				user.getDataValue("password")
			);

			if (!isPasswordMatch) return errorResponse("WRONG_PASSWORD");

			// Save token to redis
			const token = this.authRepo.getToken(user);

			// Return payload to frontend
			return {
				...successResponse(),
				token,
				company,
				user
			};
		} catch (err) {
			console.log(err);
		}
	}

	async meInfo(user: IUser) {
		const userCompany: Model<ICompany> = await Company.findByPk(
			user?.companyId
		);

		return { user, company: userCompany };
	}
}

export default AuthController;
