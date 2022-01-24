/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "@utils/responses";
import User from "@models/User";
import AuthRepository from "@repositories/auth.repository";
import { ILoginInput, IFirstTimePasswordResetInput } from "@graphql/types";
import Company from "@models/Company";
import UserRepository from "@repositories/user.repository";
import { Sequelize } from "sequelize";

class AuthController {
	authRepo = new AuthRepository();

	async firstTimePasswordReset({
		email,
		newPassword
	}: IFirstTimePasswordResetInput) {
		try {
			const user = await User.findOne({ where: { email } });
			if (!user) return errorResponse("USER_NOT_FOUND");
			user.setDataValue(
				"password",
				UserRepository.encodePassword(newPassword)
			);
			user.setDataValue("firstLogin", false);
			await user.save();
			console.log(user.toJSON());
			return successResponse();
		} catch (err) {
			console.error(err);
			return errorResponse();
		}
	}

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
							"businessTypeIds",
							"approved",
							"establishmentDate",
							[
								Sequelize.fn(
									"JSON_VALUE",
									Sequelize.col("settings"),
									Sequelize.literal(`"$.contactNumber"`)
								),
								"contactNumber"
							]
						]
					}
				]
			});
			if (!user) return errorResponse("USER_NOT_FOUND");
			let isPasswordMatch = false;
			// If it's the first time user logs in, do not use bcrypt.
			const firstLogin = !!JSON.parse(
				String(user.getDataValue("firstLogin")).toLowerCase()
			);

			if (firstLogin) {
				isPasswordMatch = password === user.getDataValue("password");
			} else {
				isPasswordMatch = bcrypt.compareSync(
					password,
					user.getDataValue("password")
				);
			}

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
