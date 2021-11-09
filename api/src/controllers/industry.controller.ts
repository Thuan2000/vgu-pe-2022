import Industry from "@models/Industry";
import { errorResponse } from "@utils/responses";

class IndustyController {
	async getIndustries() {
		try {
			const industries = await Industry.findAll();
			console.log(industries);

			return industries;
		} catch (error) {
			console.log(error);

			return errorResponse(error);
		}
	}
}

export default IndustyController;
