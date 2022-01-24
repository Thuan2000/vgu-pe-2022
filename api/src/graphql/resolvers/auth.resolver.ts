/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import AuthController from "@controllers/auth.controller";

const authController = new AuthController();

export const Mutation = {
	login: (_, { input }) => authController.login(input),
	firstTimePasswordReset: (_, { input }) =>
		authController.firstTimePasswordReset(input)
};
