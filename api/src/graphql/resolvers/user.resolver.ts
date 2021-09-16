import UserController from "../../controllers/user.controller";

const userController = new UserController();

export const Query = {
	user: (_, { id }) => userController.getUser(id),
	users: () => userController.getUsers()
};

export const Mutation = {
	register: (_, { input }) => {
		const newUser = input;

		return userController.storeUser(newUser);
	}
};
