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
import Bid from "@models/Bid";
import BRDiscussionQuestion from "@models/BRDiscussionQuestion";

class BuyingRequestController {
	async getBuyingRequestBySlug(slug: string) {
		const buyingRequest = await BuyingRequest.findOne({
			where: { slug },
			include: [
				Category,
				Industry,
				{ model: User, as: "createdBy" },
				Company,
				{
					model: BRDiscussionQuestion,
					as: "discussionQuestions",
					include: [User]
				}
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

	async getDiscoveryBuyingRequests(input: IFetchBrInput) {
		const {
			companyId,
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

		// TODO: Instead of querying ids from ES and then query again from MySQL. Return results from E.S. directly.
		const { idCount, ids } = searchValue
			? await BuyingRequest.getMatchSearched(queryBody)
			: { idCount: null, ids: null };

		const { rows: data, count } = await BuyingRequest.findAndCountAll({
			...(!searchValue ? { offset } : {}),
			...(!searchValue ? { limit } : {}),
			distinct: true,
			where: {
				...(ids ? { id: ids } : {}),
				...(companyId ? { companyId } : {}),
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
			order: [
				[
					Sequelize.fn(
						"FIELD",
						Sequelize.col("buyingRequest.companyId"),
						companyId
					),
					"ASC"
				],

				ids
					? Sequelize.fn("FIELD", Sequelize.col("buyingRequest.id"), [
							...ids
					  ])
					: ["id", "asc"]
			],
			include: [
				Company,
				Category,
				Project,
				Industry,
				{
					model: Bid,
					as: "bids",
					attributes: ["id", "createdAt"],
					include: [{ model: Company, attributes: ["id"] }]
				},
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

	async getBuyingRequests(
		companyId: number,
		{ limit, offset }: IFetchBrInput
	) {
		const {
			rows: data,
			count: dataCount
		} = await BuyingRequest.findAndCountAll({
			offset,
			limit,
			distinct: true,
			where: { companyId },
			include: [
				Company,
				Project,
				{
					model: Bid,
					as: "bids",
					attributes: ["id", "createdAt"]
				},
				{ model: User, as: "createdBy" }
			]
		});

		return {
			data,
			pagination: {
				dataCount,
				hasMore: data.length + offset < dataCount
			}
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
		...buyingRequestInput
	}: ICreateBuyingRequestInput) {
		try {
			const { name, companyId } = buyingRequestInput;

			// setProductName(productName);

			// Check duplicate
			const duplicateBr = await BuyingRequest.findOne({
				where: {
					name,
					companyId
				}
			});

			if (duplicateBr) return errorResponse(RESPONSE_MESSAGE.DUPLICATE);
			const brGallery = await uploadImages(companyName, gallery);

			const newBuyingRequest = await BuyingRequest.create({
				...buyingRequestInput,
				companyId,
				status: "OPEN"
			});
			newBuyingRequest.setDataValue(
				"slug",
				generateSlug(name, newBuyingRequest.getDataValue("id"))
			);
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
			...newValue
		}: IUpdateBuyingRequestInput
	) {
		const currentBr = await BuyingRequest.findByPk(id);
		currentBr.update(newValue);

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
