import ServiceController from "../../controllers/service.controller";

export const Mutation = {
	createService: (_, { input }) => ServiceController.createService(input)
};
