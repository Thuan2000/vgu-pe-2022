import BuyingRequestController from "@controllers/buying-request.controller";

const buyingRequestController = new BuyingRequestController();

export const Query = {
	refreshBrStatus: BuyingRequestController.refreshStatus,
	buyingRequestBySlug: (_, { slug }) =>
		buyingRequestController.getBuyingRequestBySlug(slug),
	buyingRequest: (_, { id }) => buyingRequestController.getBuyingRequest(id),
	adminBuyingRequests: (_, { companyId, input }) =>
		buyingRequestController.getBuyingRequests(companyId, input),
	getBuyingRequestsByIds: (_, { ids }) =>
		buyingRequestController.getBuyingRequestsByIds(ids),
	discoveryBuyingRequests: (_, { input }) =>
		buyingRequestController.getDiscoveryBuyingRequests(input)
};

export const Mutation = {
	closeBuyingRequest: (_, { id }) => BuyingRequestController.closeBr(id),
	openBuyingRequest: (_, { id, endDate }) =>
		BuyingRequestController.openBr(id, endDate),
	getBrsNameSuggestion: (_, { name, limit }) =>
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
