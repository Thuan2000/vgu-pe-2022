import {
	ICreateBuyingRequestInput,
	IFetchBrInput,
	IUpdateBuyingRequestInput
} from "@graphql/types";
import { Op, Sequelize } from "sequelize";
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
	searchQuery,
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
	data = 0;
	async getDiscoveryBuyingRequests(input: IFetchBrInput) {
		const {
			offset,
			searchValue,
			industryId,
			location,
			minBudget,
			maxBudget,
			// productName,
			status,
			limit
		} = input;

		const queryBody = {
			_source: ["id"],
			query: searchQuery(searchValue)
		};

		const { idCount, ids } = searchValue
			? await BuyingRequest.getMatchSearched(queryBody)
			: { idCount: null, ids: null };

		const { rows: data, count } = await BuyingRequest.findAndCountAll({
			...(!searchValue ? { offset } : {}),
			...(!searchValue ? { limit } : {}),
			distinct: true,
			where: {
				...(ids ? { id: ids } : {}),
				...(minBudget
					? {
							minBudget: {
								[Op.gte]: minBudget
							}
					  }
					: {}),
				...(maxBudget
					? {
							maxBudget: {
								[Op.lte]: maxBudget
							}
					  }
					: {}),
				...(status && status !== "ALL" ? { status } : {}),
				...(industryId ? { industryId } : {}),
				...(location ? { location } : {})
			},
			...(ids
				? {
						order: [
							Sequelize.fn(
								"FIELD",
								Sequelize.col("buyingRequest.id"),
								[...ids]
							)
						]
				  }
				: {}),
			include: [
				Company,
				Category,
				Project,
				Industry,
				{ model: User, as: "createdBy" }
			]
		});

		const hasMore = offset + data.length < count && data.length === limit;

		return {
			data,
			pagination: {
				dataCount: count,
				hasMore
			}
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

	async getSuggestion(inputName: string, limit: number) {
		const queryBody = {
			query: searchQuery(inputName),
			highlight: {
				// eslint-disable-next-line @typescript-eslint/camelcase
				tags_schema: "styled",
				fields: {
					name: {}
				}
			},
			size: limit
		};
		const brs = await BuyingRequest.getNameSearchSuggestion(queryBody);

		const suggestion = brs.map(br => ({
			name: br?._source?.name,
			highlightedName: br?.highlight?.name[0]
		}));

		return suggestion;
	}
}

export default BuyingRequestController;
