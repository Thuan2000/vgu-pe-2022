/* eslint-disable @typescript-eslint/camelcase */
import {
	ICreateBuyingRequestInput,
	IFetchBrInput,
	IUpdateBuyingRequestInput
} from "@graphql/types";
import { Op, Sequelize } from "sequelize";
import BuyingRequest from "@models/BuyingRequest";
import User from "@models/User";
import UploaderRepository from "@repositories/uploads.repository";
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
import BuyingRequestRepository from "@repositories/buying-request.repository";
import Bid from "@models/Bid";
import BRDiscussionQuestion from "@models/BRDiscussionQuestion";
import OpenSearch from "@services/open-search.service";

class BuyingRequestController {
	async getBuyingRequestBySlug(slug: string) {
		try {
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
		} catch (error) {
			console.log(error);
		}
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

	async getDiscoveryBuyingRequests({
		companyId,
		limit,
		offset,
		searchValue,
		...input
	}: IFetchBrInput) {
		const queryBody = {
			size: limit,
			from: offset,
			query: BuyingRequestRepository.getSearchQuery(searchValue, input),
			sort: [{ status: { order: "desc" } }]
		};

		const { dataCount: count, brs } = await BuyingRequest.getMatchSearched(
			queryBody
		);

		const hasMore = offset + brs.length < count && brs.length === limit;

		return {
			data: brs,
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
			BuyingRequest.deleteEsBrs([id]);
			await BuyingRequest.destroy({ where: { id } });

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse(e);
		}
	}

	async deleteBuyingRequests(ids: number[]) {
		try {
			BuyingRequest.deleteEsBrs(ids);
			await BuyingRequest.destroy({ where: { id: ids } });
			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse(e);
		}
	}

	async createBuyingRequest(buyingRequestInput: ICreateBuyingRequestInput) {
		try {
			const { name, companyId, companyName } = buyingRequestInput;

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
				status: "OPEN"
			});
			newBuyingRequest.setDataValue(
				"slug",
				generateSlug(name, newBuyingRequest.getDataValue("id"))
			);

			// @TODO : Remove This later on es refactor
			// BuyingRequest.insertIndex(newBuyingRequest.toJSON());
			BuyingRequestRepository.insertCreateToElasticSearch(
				newBuyingRequest.toJSON(),
				companyId,
				companyName
			);

			return newBuyingRequest.save().then(() => successResponse());
		} catch (error) {
			console.log(error);
			return errorResponse(error);
		}
	}

	async updateBuyingRequest(id, newValue: IUpdateBuyingRequestInput) {
		// @ TODO Make this work
		// await BuyingRequest.updateESIndex(newValue, { where: id });

		const curBr = await BuyingRequest.findByPk(id, {
			include: [Company]
		});

		curBr.update(newValue);

		BuyingRequest.updateEsBr(id, { ...curBr.toJSON(), ...newValue });

		await curBr.save();

		return successResponse();
	}

	async getSuggestion(inputName: string, limit: number) {
		const queryBody = {
			query: BuyingRequestRepository.nameSuggestionQuery(inputName),
			_source: ["name"],
			highlight: {
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
