import { ICreateBidInput } from "@graphql/types";
import Bid from "@models/Bid";
import { createSuccessResponse } from "@utils/responses";

class BidController {
	static async createBid(input: ICreateBidInput) {
		const newBid = await Bid.create(input);

		const id = await newBid.getDataValue("id");

		return newBid.save().then(() => createSuccessResponse(id));
	}
}

export default BidController;
