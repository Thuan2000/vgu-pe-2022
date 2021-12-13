import ServiceController from "../../controllers/service.controller";

export const Mutation = {
	createService: (_, { input }) => ServiceController.createService(input)
};

export const Query = {
	services: (_, { input }) => ServiceController.getServices(input)
};
