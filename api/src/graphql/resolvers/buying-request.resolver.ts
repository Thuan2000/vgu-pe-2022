import BuyingRequestController from "@controllers/buying-request.controller";
import BuyingRequest from "@models/BuyingRequest";

const buyingRequestController = new BuyingRequestController();

export const Query = {
	deleteIndex: BuyingRequest.deleteIndex,
	createIndex: BuyingRequest.createIndex,
	bulkData: BuyingRequest.bulkInsert,
	buyingRequestBySlug: (_, { slug }) =>
		buyingRequestController.getBuyingRequestBySlug(slug),
	buyingRequest: (_, { id }) => buyingRequestController.getBuyingRequest(id),
	buyingRequestsAndCount: (_, { companyId, offset }) =>
		buyingRequestController.getBuyingRequests(companyId, offset),
	getBuyingRequestsByIds: (_, { ids }) =>
		buyingRequestController.getBuyingRequestsByIds(ids),
	discoveryBuyingRequests: (_, { input }) =>
		buyingRequestController.getDiscoveryBuyingRequests(input)
};

export const Mutation = {
	getSuggestion: (_, { name, limit }) =>
		buyingRequestController.getSuggestion(name, limit),
	createBuyingRequest: (_, { input }) =>
		buyingRequestController.createBuyingRequest(input),
	updateBuyingRequest: (_, { id, newValue }) =>
		buyingRequestController.updateBuyingRequest(id, newValue),
	deleteBuyingRequest: (_, { id }) =>
		buyingRequestController.deleteBuyingRequest(id),
	deleteBuyingRequests: (_, { ids }) =>
		buyingRequestController.deleteBuyingRequests(ids)
};
