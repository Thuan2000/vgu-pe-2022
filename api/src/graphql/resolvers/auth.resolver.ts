import AuthController from "../../controllers/auth.controller";

export const Mutation = {
	login: (_, { input }) => {
		const { email, password } = input;
	}
};
