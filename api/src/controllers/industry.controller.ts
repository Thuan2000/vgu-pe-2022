import Industry from "@models/Industry";
import { errorResponse } from "@utils/responses";

class IndustyController {
	async getIndustries() {
		try {
			const industries = Industry.findAll();

			return industries;
		} catch (error) {
			console.log(error);

			return errorResponse(error);
		}
	}
}

export default IndustyController;
