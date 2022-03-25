import { IAddAlreadyPaidCompanyInput } from "@graphql/types";
import AlreadyPaidCompany from "@models/AlreadyPaidCompany";
import Company from "@models/Company";
import { errorResponse, successResponse } from "@utils/responses";

class AlreadyPaidCompanyController {
	static async addAlreadyPaidCompany(input: IAddAlreadyPaidCompanyInput) {
		try {
			await AlreadyPaidCompany.create({
				...input
			});
			return successResponse();
		} catch (error) {
			console.error(error);
			return errorResponse(error.toString());
		}
	}

	static async getAlreadyPaidCompanies() {
		try {
			const alreadyPaidCompanies = await AlreadyPaidCompany.findAll({
				where: {
					isSubscribed: false
				},
				include: [{ model: Company, as: "company" }]
			});
			console.log(alreadyPaidCompanies);

			return alreadyPaidCompanies;
		} catch (error) {
			console.error(error);
			return errorResponse(error.toString());
		}
	}

	static async seIsSubscribedTrue(id: number) {
		try {
			const alreadyPaidData = await AlreadyPaidCompany.findByPk(id);
			alreadyPaidData.setDataValue("isSubscribed", true);

			return successResponse();
		} catch (error) {
			console.error(error);
			return errorResponse(error.toString());
		}
	}
}

export default AlreadyPaidCompanyController;
