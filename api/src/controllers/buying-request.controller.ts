import BuyingRequest from "@models/BuyingRequest";
import { errorResponse, successResponse } from "../utils";

class BuyingRequestController {
	async getBuyingRequests(companyId: number) {
		const buyingRequests = await BuyingRequest.findAll({
			where: { attribute: "companyId", val: companyId }
		});

		return buyingRequests;
	}

	// @TODO Make this thing typed
	async createBuyingRequest(buyingRequestInput: any) {
		try {
			const newBuyingRequest = await BuyingRequest.create({
				...buyingRequestInput,
				status: "OPEN"
			});
			(await newBuyingRequest).save;

			return successResponse();
		} catch (error) {
			console.log(error);
			return errorResponse(error);
		}
	}
}

export default BuyingRequestController;
