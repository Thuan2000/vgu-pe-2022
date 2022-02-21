/* eslint-disable @typescript-eslint/camelcase */
import {
	IBrStatus,
	ICreateBuyingRequestInput,
	IFetchBrInput,
	IFile,
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
import Company from "@models/Company";
import Project from "@models/Project";
import BuyingRequestRepository from "@repositories/buying-request.repository";
import BRDiscussionQuestion from "@models/BRDiscussionQuestion";
import { IRefreshBrStatusResponse } from "@graphql/types";
import S3 from "@services/s3.service";

class BuyingRequestController {
	static async closeBr(id: number) {
		try {
			const br = await BuyingRequest.findByPk(id);

			br.setDataValue("status", "CLOSE" as IBrStatus);
			br.save();

			BuyingRequest.updateEsBr(br.getDataValue("id"), br.toJSON());

			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse(e.toString());
		}
	}

	static async openBr(id: number, endDate: Date) {
		try {
			const br = await BuyingRequest.findByPk(id);

			br.setDataValue("status", "OPEN" as IBrStatus);
			br.setDataValue("endDate", endDate);
			br.save();

			BuyingRequest.updateEsBr(br.getDataValue("id"), br.toJSON());

			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse(e.toString());
		}
	}

	static async refreshStatus(): Promise<IRefreshBrStatusResponse> {
		try {
			const currentTime = new Date().getTime();
			const wrongStatusBrs = await BuyingRequest.findAll({
				where: {
					status: "OPEN" as IBrStatus,
					endDate: { [Op.lte]: currentTime },
					isDeleted: false
				},
				include: [
					{
						model: Company,
						attributes: ["id", "name", "chatId"]
					}
				]
			});

			wrongStatusBrs.forEach(br => {
				br.setDataValue("status", "CLOSE" as IBrStatus);
				br.save();

				BuyingRequest.updateEsBr(br.getDataValue("id"), br.toJSON());
			});

			return {
				updatedAmount: wrongStatusBrs.length,
				...successResponse()
			};
		} catch (e) {
			console.error(e);
			return errorResponse(e.toString());
		}
	}

	async getBuyingRequestBySlug(slug: string) {
		try {
			const buyingRequest = await BuyingRequest.findOne({
				where: { slug },
				include: [
					Company,
					{ model: User, as: "createdBy" },
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
			where: { id: ids, isDeleted: false }
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
			where: { companyId, isDeleted: false },
			include: [Company, Project, { model: User, as: "createdBy" }]
		});

		return {
			data,
			pagination: {
				dataCount,
				hasMore: data.length + offset < dataCount
			}
		};
	}

	private async removeGallery(gallery: IFile[]) {
		gallery.map(img => {
			S3.deleteFile(img.location);
		});
	}

	async deleteBuyingRequest(id: number) {
		try {
			const br = await BuyingRequest.findByPk(id, {
				attributes: ["gallery", "id"]
			});

			this.removeGallery((br.toJSON() as any).gallery);

			br.setDataValue("isDeleted", true);
			br.save();

			const r = await BuyingRequest.deleteEsBrs([id]);

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse(e);
		}
	}

	async deleteBuyingRequests(ids: number[]) {
		try {
			const r = await BuyingRequest.deleteEsBrs(ids);
			const brs = await BuyingRequest.findAll({
				where: { id: ids, isDeleted: false },
				attributes: ["gallery", "id"]
			});

			brs.map(br => {
				this.removeGallery((br.toJSON() as any).gallery);
				br.setDataValue("isDeleted", true);
				br.save();
			});

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse(e);
		}
	}

	async createBuyingRequest(buyingRequestInput: ICreateBuyingRequestInput) {
		try {
			const { name, companyId, companyName, chatId } = buyingRequestInput;

			// Check duplicate
			const duplicateBr = await BuyingRequest.findOne({
				where: {
					name,
					companyId
				},
				attributes: ["id"]
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

			const company = {
				id: companyId,
				name: companyName,
				chatId
			};

			const r = await BuyingRequest.insertToIndex({
				company,
				...newBuyingRequest.toJSON()
			});

			return newBuyingRequest.save().then(() => successResponse());
		} catch (error) {
			console.error(error);
			return errorResponse(error);
		}
	}

	async updateBuyingRequest(id, newValue: IUpdateBuyingRequestInput) {
		const curBr = await BuyingRequest.findByPk(id, {
			include: [Company]
		});

		curBr.update(newValue);

		const r = await BuyingRequest.updateEsBr(id, {
			...curBr.toJSON(),
			...newValue
		});

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
