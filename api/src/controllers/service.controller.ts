// const {
// 	rows: services,
// 	count: dataCount
// } = await Service.findAndCountAll({
// 	offset,
// 	limit,
// 	where: {
// 		...input
// 	},
// 	attributes: [
// 		"id",
// 		"slug",
// 		"name",
// 		"price",
// 		"coverImage",
// 		"minPrice",
// 		"maxPrice",
// 		"location",
// 		"rating"
// 	],
// 	include: [{ model: Company, attributes: ["name"] }]
// });

/* eslint-disable @typescript-eslint/camelcase */
import {
	ICreateServiceInput,
	IFetchServicesInput,
	IUpdateServiceInput
} from "@graphql/types";
import Company from "@models/Company";
import Service from "@models/Service";
import Tag from "@models/Tag";
import User from "@models/User";
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
		const service = await Service.findOne({
			where: { slug },
			include: [{ model: Company, attributes: ["id", "name"] }, Tag]
		});

		return service;
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
			Service.deleteEsServices(ids);
			await Service.destroy({ where: { id: ids } });

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async createService(input: ICreateServiceInput) {
		try {
			const {
				tags,
				newTags,
				companyId,
				createdById,
				companyName,
				...serviceInput
			} = input;
			const isExist = await Service.findOne({
				where: {
					companyId,
					name: serviceInput.name
				}
			});

			if (!!isExist) return errorResponse("SERVICE_EXIST");

			const newService = await Service.create({
				companyId,
				createdById,
				...serviceInput
			});
			newService.setDataValue(
				"slug",
				generateSlug(input.name, newService.getDataValue("id"))
			);

			TagRepository.createTags(newTags);
			(newService as any).setTags(tags);

			// @TODO : Remove This later on es refactor

			ServiceRepository.insertCreateToElasticSearch(
				newService.toJSON(),
				companyId,
				companyName
			);

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

			Service.updateEsService(id, { ...service.toJSON(), ...newInput });

			return createSuccessResponse(id);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async getNameSuggestion(inputName: string, limit: number) {
		console.log(inputName);

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
