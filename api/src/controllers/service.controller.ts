import { ICreateServiceInput, IFetchServicesInput } from "@graphql/types";
import Service from "@models/Service";
import TagRepository from "@repositories/tag.repository";
import { createSuccessResponse, errorResponse } from "@utils/responses";

class ServiceController {
	static async getServices({ offset, limit, ...input }: IFetchServicesInput) {
		try {
			console.log(input);

			const services = await Service.findAll({
				offset,
				limit,
				where: {},
				attributes: [
					"id",
					"name",
					"price",
					"minPrice",
					"maxPrice",
					"location",
					"rating"
				]
			});

			return services;
		} catch (e) {
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

			TagRepository.createTags(newTags);

			const tagNames = tags.map(t => t.name);
			(newService as any).setTags(tagNames);

			return newService
				.save()
				.then(() =>
					createSuccessResponse(newService.getDataValue("id"))
				);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

export default ServiceController;
