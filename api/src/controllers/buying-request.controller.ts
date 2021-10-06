import { IBuyingRequestInput } from "@graphql/types";
import BuyingRequest from "@models/BuyingRequest";
import { uploadImages } from "@repositories/uploads.repository";
import { errorResponse, generateSlug, successResponse } from "@utils";

function setBrGallery(data: Promise<unknown>[], br: BuyingRequest) {
	let doneCount = 0;

	data.forEach(async d => {
		d.then(img => {
			++doneCount;
			const currentImgs = br.getDataValue("gallery") || [];
			br.set("gallery", [...currentImgs, img]);

			if (doneCount >= data.length - 1) {
				br.save();
			}
		});
	});
}

class BuyingRequestController {
	async getBuyingRequests(companyId: number) {
		const buyingRequests = await BuyingRequest.findAll({
			where: { attribute: "companyId", val: companyId }
		});

		return buyingRequests;
	}

	// @TODO Make this thing typed
	async createBuyingRequest({
		gallery,
		companyName,
		...buyingRequestInput
	}: IBuyingRequestInput) {
		try {
			const { name, productName, location, endDate } = buyingRequestInput;
			// Check duplicate
			const duplicateBr = await BuyingRequest.findOne({
				where: {
					name,
					productName,
					location,
					endDate
				}
			});

			if (duplicateBr) return errorResponse("DUPLICATE_BR");

			const newBuyingRequest = await BuyingRequest.create({
				...buyingRequestInput,
				slug: generateSlug(buyingRequestInput.name),
				status: "OPEN"
			});

			const brGallery = await uploadImages(companyName, gallery);

			setBrGallery(brGallery, newBuyingRequest);

			(await newBuyingRequest).save();
			return successResponse();
		} catch (error) {
			console.log(error);
			return errorResponse(error);
		}
	}
}

export default BuyingRequestController;
