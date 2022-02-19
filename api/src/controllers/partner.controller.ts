import { IPartnerInput } from "../graphql/types";
import Partner from "../models/Partner";
import { errorResponse, successResponse } from "../utils";

class PartnerController {
	static async createPartner(input: IPartnerInput) {
		try {
			const newPartner = Partner.create({ ...input });
			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	static async deletePartner(id: number) {
		try {
			await Partner.destroy({ where: { id } });
			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	static async updatePartner(id: number, newValue: IPartnerInput) {
		try {
			await Partner.update(newValue, { where: { id } });
			return successResponse();
		} catch (e) {
			console.error(e);
			return errorResponse();
		}
	}

	static async getPartners() {
		try {
			const partners = await Partner.findAll();
			return partners;
		} catch (e) {
			console.error(e);
			return [];
		}
	}

	static async getPartner(id: number) {
		try {
			const partner = await Partner.findByPk(id);
			return partner;
		} catch (e) {
			console.error(e);
			return {};
		}
	}
}

export default PartnerController;
