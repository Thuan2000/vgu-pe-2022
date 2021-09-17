import AuthController from "../../controllers/auth.controller";

const authController = new AuthController();

export const Mutation = {
	login: (_, { input }) => {
		const { email, password } = input;
		return authController.login(email, password);
	}
};
