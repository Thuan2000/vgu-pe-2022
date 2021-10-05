import BuyingRequestController from "@controllers/buying-request.controller";

const buyingRequestController = new BuyingRequestController();

export const Query = {
	buyingRequests: (_, { companyId }) =>
		buyingRequestController.getBuyingRequests(companyId)
};

export const Mutation = {
	createBuyingRequest: (_, { input }) =>
		buyingRequestController.createBuyingRequest(input)
};
