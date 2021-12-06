import CategoryController from "@controllers/category.controller";

export const Query = {
	categories: (_, { industryId }) =>
		CategoryController.getCategories(industryId)
};
