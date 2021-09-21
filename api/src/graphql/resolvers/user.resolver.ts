/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import UserController from "../../controllers/user.controller";

const userController = new UserController();

export const Query = {
	user: (_, { id }) => userController.getUser(id),
	users: () => userController.getUsers()
};
