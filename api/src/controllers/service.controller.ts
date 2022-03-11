/* eslint-disable @typescript-eslint/camelcase */
import {
	ICreateServiceInput,
	IFetchServicesInput,
	IUpdateServiceInput
} from "@graphql/types";
import Company from "@models/Company";
import Service from "@models/Service";
import Tag from "@models/Tag";
import ServiceRepository from "@repositories/service.repository";
import TagRepository from "@repositories/tag.repository";
import { generateSlug } from "@utils/functions";
import {
	createSuccessResponse,
	errorResponse,
	successResponse
} from "@utils/responses";

class ServiceController {
	static async getService(slug) {
		try {
			const service = await Service.findOne({
				where: { slug },
				include: [Company, Tag]
			});

			console.log("Get Product : ", service);

			return service;
		} catch (error) {
			console.log(error);
		}
	}

	static async getServices({
		offset,
		limit,
		searchValue,
		...input
	}: IFetchServicesInput) {
		try {
			const queryBody = {
				size: limit,
				from: offset,
				query: ServiceRepository.getSearchQuery(searchValue, input)
			};

			const { dataCount, services } = await Service.getMatchSearched(
				queryBody
			);

			const hasMore =
				offset + services.length < dataCount &&
				services.length === limit;
			const pagination = { dataCount, hasMore };
			return { services, pagination };
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async deleteServices(ids: number[]) {
		try {
			const r = await Service.deleteEsServices(ids);
			const resp = await Service.destroy({ where: { id: ids } });

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async createService(input: ICreateServiceInput) {
		const {
			tags,
			newTags,
			companyId,
			createdById,
			companyName,
			chatId,
			...rest
		} = input;

		try {
			const isExist = await Service.findOne({
				where: {
					companyId,
					name: rest.name
				}
			});

			if (!!isExist) return errorResponse("SERVICE_EXIST");

			const newService = await Service.create({
				companyId,
				createdById,
				...rest
			});
			newService.setDataValue(
				"slug",
				generateSlug(input.name, newService.getDataValue("id"))
			);

			TagRepository.createTags(newTags);
			(newService as any).setTags(tags);

			const company = {
				id: companyId,
				name: companyName
			};

			const r = await Service.insertToIndex({
				company,
				...newService.toJSON()
			});
			await newService.save();

			return createSuccessResponse(newService.getDataValue("id"));
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async updateService(input: IUpdateServiceInput) {
		try {
			const { tags, newTags, id, ...newInput } = input;

			const service = await Service.findByPk(id, {
				include: [Company]
			});
			service.update(newInput);

			TagRepository.createTags(newTags);
			(service as any).setTags(tags);

			await Service.updateEsService(id, {
				...service.toJSON(),
				...newInput
			});

			return createSuccessResponse(id);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async getNameSuggestion(inputName: string, limit: number) {
		const queryBody = {
			query: ServiceRepository.nameSuggestionQuery(inputName),
			_source: ["name"],
			highlight: {
				tags_schema: "styled",
				fields: {
					name: {}
				}
			},
			size: limit
		};

		const rawServicesName = await Service.getNameSearchSuggestion(
			queryBody
		);

		const suggestions = rawServicesName.map(br => ({
			name: br?._source?.name,
			highlightedName: br?.highlight?.name[0]
		}));

		return suggestions;
	}
}

export default ServiceController;
