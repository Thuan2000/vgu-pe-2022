import bcrypt from "bcrypt";

import { errorResponse, successResponse } from "@utils/responses";
import User from "@models/User";
import AuthRepository from "@repositories/auth.repository";
import { ICompany, ILoginInput, IUser } from "@graphql/types";
import Company from "@models/Company";
import { Model, Sequelize } from "sequelize";

class AuthController {
	authRepo = new AuthRepository();

	async login({ email, password }: ILoginInput) {
		try {
			const user = await User.findOne({
				where: { email },
				include: [
					{
						model: Company,
						as: "company",
						attributes: [
							"id",
							"name",
							"slug",
							"industryId",
							"businessTypeId",
							"approved",
							"establishmentDate"
							// [Sequelize.fn("JSON_VALUE",Sequelize.col("settings"),"$.contactNumber"),"contact number"]
						]
					}
				]
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
				user
			};
		} catch (err) {
			console.log(err);
		}
	}
}

export default AuthController;
