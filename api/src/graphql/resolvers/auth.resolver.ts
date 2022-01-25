/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import AuthController from "@controllers/auth.controller";

const authController = new AuthController();

export const Query = {
	getEmailFromCryptoToken: (_, { token }) =>
		authController.getEmailFromCryptoToken(token)
};

export const Mutation = {
	login: (_, { input }) => authController.login(input),
	firstTimePasswordReset: (_, { input }) =>
		authController.firstTimePasswordReset(input),
	forgetPasswordSendEmail: (_, { email }) =>
		authController.forgetPasswordSendEmail(email),

	forgetResetPassword: (_, { input }) =>
		authController.forgetResetPassword(input)
};
