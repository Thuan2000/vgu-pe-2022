import AuthController from "@controllers/auth.controller";

const authController = new AuthController();

export const Mutation = {
	login: (_, { input }) => authController.login(input)
};
