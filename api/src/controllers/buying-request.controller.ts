import {
	ICreateBuyingRequestInput,
	IFetchBrInput,
	IUpdateBuyingRequestInput
} from "@graphql/types";
import { Op } from "sequelize";
import BuyingRequest from "@models/BuyingRequest";
import User from "@models/User";
import { uploadImages } from "@repositories/uploads.repository";
import {
	BUYING_REQUESTS_GET_LIMIT,
	errorResponse,
	generateSlug,
	RESPONSE_MESSAGE,
	successResponse
} from "@utils";
import Category from "../models/Category";
import Industry from "../models/Industry";
import Company from "@models/Company";
import Project from "@models/Project";
import {
	setBrGallery,
	setProductName
} from "@repositories/buying-request.repository";

class BuyingRequestController {
	async getBuyingRequestBySlug(slug: string) {
		const buyingRequest = await BuyingRequest.findOne({
			where: { slug },
			include: [
				Category,
				Industry,
				{ model: User, as: "createdBy" },
				Company
			]
		});

		return buyingRequest;
	}

	async getBuyingRequest(id: number) {
		const allBuyingRequest = await BuyingRequest.findByPk(id);

		return allBuyingRequest;
	}
	async getBuyingRequestsByIds(ids: number[]) {
		const allBuyingRequests = await BuyingRequest.findAll({
			where: { id: ids }
		});

		return allBuyingRequests;
	}

	async getDiscoveryBuyingRequestsAndCount(input: IFetchBrInput) {
		const { companyId, offset, searchValue } = input;

		const ids = searchValue
			? await BuyingRequest.getMatchSearched(searchValue)
			: null;

		const { rows, count } = await BuyingRequest.findAndCountAll({
			offset,
			limit: BUYING_REQUESTS_GET_LIMIT,
			where: {
				...(ids ? { id: ids } : {})
			},
			include: [
				Company,
				Category,
				Project,
				Industry,
				{ model: User, as: "createdBy" }
			]
		});

		return {
			buyingRequests: rows,
			totalDataCount: count
		};
	}

	async getBuyingRequests(companyId: number, offset: number) {
		const { rows, count } = await BuyingRequest.findAndCountAll({
			offset,
			limit: BUYING_REQUESTS_GET_LIMIT,
			where: { companyId },
			include: [
				Project,
				Category,
				Industry,
				{ model: User, as: "createdBy" }
			]
		});

		return {
			buyingRequests: rows,
			totalDataCount: count
		};
	}

	async deleteBuyingRequest(id: number) {
		try {
			await BuyingRequest.destroy({ where: { id } });

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse(e);
		}
	}

	async deleteBuyingRequests(ids: number[]) {
		try {
			await BuyingRequest.destroy({ where: { id: ids } });

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse(e);
		}
	}

	async createBuyingRequest({
		gallery,
		companyName,
		categoryIds,
		...buyingRequestInput
	}: ICreateBuyingRequestInput) {
		try {
			const { name, productName, companyId } = buyingRequestInput;

			setProductName(productName);

			// Check duplicate
			const duplicateBr = await BuyingRequest.findOne({
				where: {
					name,
					companyId
				}
			});

			if (duplicateBr) return errorResponse(RESPONSE_MESSAGE.DUPLICATE);

			const newBuyingRequest = await BuyingRequest.create({
				...buyingRequestInput,
				cateories: categoryIds,
				companyId,
				slug: generateSlug(buyingRequestInput.name),
				status: "OPEN"
			});

			// To understand this read sequelize associations
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(newBuyingRequest as any).setCategories(categoryIds);

			const brGallery = await uploadImages(companyName, gallery);
			setBrGallery(brGallery, newBuyingRequest);

			return newBuyingRequest.save().then(() => successResponse());
		} catch (error) {
			console.log(error);
			return errorResponse(error);
		}
	}

	async updateBuyingRequest(
		id,
		{
			companyName,
			gallery,
			oldGallery,
			categoryIds,
			...newValue
		}: IUpdateBuyingRequestInput
	) {
		const currentBr = await BuyingRequest.findByPk(id);

		// @Note : To hold the process
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const data = await setProductName(newValue.productName);

		currentBr.update(newValue);
		// To understand this read sequelize associations
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(currentBr as any).setCategories(categoryIds);

		const newGallery = await uploadImages(companyName, gallery);
		currentBr.setDataValue("gallery", oldGallery);

		setBrGallery(newGallery, currentBr);

		currentBr.save();

		return successResponse();
	}

	async getSuggestion(inputName: string) {
		const brs = await BuyingRequest.getNameSearchSuggestion(inputName);

		const suggestion = brs.map(br => ({
			name: br?._source?.name,
			highlightedName: br?.highlight?.name[0]
		}));

		return suggestion;
	}
}

export default BuyingRequestController;
