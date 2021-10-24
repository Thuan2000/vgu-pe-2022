import BuyingRequestController from "@controllers/buying-request.controller";

const buyingRequestController = new BuyingRequestController();

export const Query = {
	buyingRequestBySlug: (_, { slug }) =>
		buyingRequestController.getBuyingRequestBySlug(slug),
	buyingRequest: (_, { id }) => buyingRequestController.getBuyingRequest(id),
	buyingRequestsAndCount: (_, { companyId, offset }) =>
		buyingRequestController.getBuyingRequests(companyId, offset),
	getBuyingRequestsByIds: (_, { ids }) =>
		buyingRequestController.getBuyingRequestsByIds(ids),
	discoveryBuyingRequestsAndCount: (_, { companyId, offset }) =>
		buyingRequestController.getDiscoveryBuyingRequestsAndCount(
			companyId,
			offset
		)
};

export const Mutation = {
	createBuyingRequest: (_, { input }) =>
		buyingRequestController.createBuyingRequest(input),
	updateBuyingRequest: (_, { id, newValue }) =>
		buyingRequestController.updateBuyingRequest(id, newValue),
	deleteBuyingRequest: (_, { id }) =>
		buyingRequestController.deleteBuyingRequest(id),
	deleteBuyingRequests: (_, { ids }) =>
		buyingRequestController.deleteBuyingRequests(ids)
};
