import BidController from "@controllers/bid.controller";

export const Mutation = {
	createBid: (_, { input }) => BidController.createBid(input)
};
