/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "@utils/responses";
import User from "@models/User";
import AuthRepository from "@repositories/auth.repository";
import {
	ILoginInput,
	IFirstTimePasswordResetInput,
	IForgetResetPasswordInput
} from "@graphql/types";
import Company from "@models/Company";
import UserRepository from "@repositories/user.repository";
import { Sequelize } from "sequelize";
import EmailService from "@services/email.service";
import {
	EEMailTemplates,
	EMAIL_MESSAGES,
	EMAIL_SUBJECTS
} from "@utils/email_constants";
import { JsonWebTokenError } from "jsonwebtoken";

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
							"chatId"
							// [
							// 	Sequelize.fn(
							// 		"JSON_VALUE",
							// 		Sequelize.col("settings"),
							// 		Sequelize.literal(`"$.contactNumber"`)
							// 	),
							// 	"contactNumber"
							// ]
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
			const token = AuthRepository.generateJwtToken(user);

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

	async forgetPasswordSendEmail(email: string) {
		try {
			const user: any = await User.findOne({
				where: { email },
				attributes: ["firstName", "lastName"]
			});

			if (!user) return errorResponse("USER_NOT_FOUND");

			const resetPasswordToken = await AuthRepository.generateCryptoToken();
			const forgotPasswordTokenLink = `${process.env.SHOP_URL}/forget-password?token=${resetPasswordToken}`;

			await AuthRepository.saveCryptoTokenInRedis(
				resetPasswordToken,
				email
			);

			EmailService.sendEmail(email, {
				name: `${user?.toJSON().firstName} ${user?.toJSON().lastName}`,
				template: EEMailTemplates.FORGOT_PASSWORD,
				subject: EMAIL_SUBJECTS.FORGOT_PASSWORD,
				message: `${EMAIL_MESSAGES.FORGOT_PASSWORD}`,
				forgotPasswordTokenLink
			});
			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	async getEmailFromCryptoToken(token: string) {
		const email = await AuthRepository.getEmailFromCryptoToken(token);

		return email;
	}

	async forgetResetPassword({
		email,
		token,
		newPassword
	}: IForgetResetPasswordInput) {
		try {
			// Validate token
			const isValid = await AuthRepository.validateToken(token);
			if (!isValid) return errorResponse("TOKEN_INVALID");

			const encodedPassword = UserRepository.encodePassword(newPassword);
			const user = await User.findOne({ where: { email } });
			user.setDataValue("password", encodedPassword);
			await user.save();
			await AuthRepository.removeTokenFromDb(token);

			return successResponse();
		} catch (error) {
			console.error(error);
			return errorResponse();
		}
	}
}

export default AuthController;
