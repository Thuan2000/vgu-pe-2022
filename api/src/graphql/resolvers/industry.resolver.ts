import IndustyController from "@controllers/industry.controller";

const industryController = new IndustyController();

export const Query = {
	industries: () => industryController.getIndustries()
};
