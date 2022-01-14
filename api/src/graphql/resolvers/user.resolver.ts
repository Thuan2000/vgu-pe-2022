/**
 * Copyright Emolyze Tech ©2021
 * Good codes make the world a better place!
 */

import UserController from "@controllers/user.controller";

export const Mutation = {
	checkEmail: (_, { email }) => UserController.checkEmail(email)
};

export const Query = {
	user: (_, { id }) => UserController.getUser(id),
	users: () => UserController.getUsers()
};
