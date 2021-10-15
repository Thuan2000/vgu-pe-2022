import BuyingRequestController from "@controllers/buying-request.controller";

const buyingRequestController = new BuyingRequestController();

export const Query = {
	buyingRequest: (_, { slug }) =>
		buyingRequestController.getBuyingRequest(slug),
	buyingRequestsAndCount: (_, { companyId, offset }) =>
		buyingRequestController.getBuyingRequests(companyId, offset),
	getBuyingRequestsByIds: (_, { ids }) =>
		buyingRequestController.getBuyingRequestsByIds(ids)
};

export const Mutation = {
	createBuyingRequest: (_, { input }) =>
		buyingRequestController.createBuyingRequest(input),
	deleteBuyingRequest: (_, { id }) =>
		buyingRequestController.deleteBuyingRequest(id),
	deleteBuyingRequests: (_, { ids }) =>
		buyingRequestController.deleteBuyingRequests(ids)
};
