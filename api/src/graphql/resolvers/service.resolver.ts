import ServiceController from "../../controllers/service.controller";

export const Mutation = {
	createService: (_, { input }) => ServiceController.createService(input),
	deleteServices: (_, { ids }) => ServiceController.deleteServices(ids)
};

export const Query = {
	services: (_, { input }) => ServiceController.getServices(input)
};
