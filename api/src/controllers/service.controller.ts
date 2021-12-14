import { ICreateServiceInput, IFetchServicesInput } from "@graphql/types";
import Company from "@models/Company";
import Service from "@models/Service";
import TagRepository from "@repositories/tag.repository";
import { generateSlug } from "@utils/functions";
import {
	createSuccessResponse,
	errorResponse,
	successResponse
} from "@utils/responses";

class ServiceController {
	static async getService(slug) {
		const service = Service.findOne({
			where: { slug },
			include: [{ model: Company, attributes: ["id", "name"] }]
		});

		return service;
	}

	static async getServices({ offset, limit, ...input }: IFetchServicesInput) {
		try {
			const {
				rows: services,
				count: dataCount
			} = await Service.findAndCountAll({
				offset,
				limit,
				where: {
					...input
				},
				attributes: [
					"id",
					"slug",
					"name",
					"price",
					"coverImage",
					"minPrice",
					"maxPrice",
					"location",
					"rating"
				],
				include: [{ model: Company, attributes: ["name"] }]
			});

			const hasMore =
				offset + services.length < dataCount &&
				services.length === limit;
			const pagination = { dataCount, hasMore };
			return { services, pagination };
		} catch (e) {
			console.log(e);
		}
	}

	static async deleteServices(ids: number[]) {
		try {
			await Service.destroy({ where: { id: ids } });
			return successResponse();
		} catch (e) {
			return errorResponse();
			console.log(e);
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

			const tagNames = tags.map(t => t.name);
			(newService as any).setTags(tagNames);

			await newService.save();
			return createSuccessResponse(newService.getDataValue("id"));
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

export default ServiceController;
