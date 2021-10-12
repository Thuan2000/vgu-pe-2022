import BuyingRequestController from "@controllers/buying-request.controller";

const buyingRequestController = new BuyingRequestController();

export const Query = {
	buyingRequestsAndCount: (_, { companyId, offset }) =>
		buyingRequestController.getBuyingRequests(companyId, offset)
};

export const Mutation = {
	createBuyingRequest: (_, { input }) =>
		buyingRequestController.createBuyingRequest(input)
};
