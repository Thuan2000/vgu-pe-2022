import Service from "@models/Service";
import ServiceController from "../../controllers/service.controller";

export const Mutation = {
	serviceNameSuggestion: (_, { name, limit }) =>
		ServiceController.getNameSuggestion(name, limit),
	createService: (_, { input }) => ServiceController.createService(input),
	updateService: (_, { input }) => ServiceController.updateService(input),
	deleteServices: (_, { ids }) => ServiceController.deleteServices(ids)
};

export const Query = {
	createServiceEsIndex: () => Service.createIndex(),
	bulkServiceEsIndex: () => Service.firstBulkElasticSearch(),
	deleteServiceEsIndex: () => Service.deleteIndex(),
	services: (_, { input }) => ServiceController.getServices(input),
	service: (_, { slug }) => ServiceController.getService(slug)
};
