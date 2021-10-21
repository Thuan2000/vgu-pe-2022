import CategoryController from "@controllers/category.controller";

const categoryController = new CategoryController();

export const Query = {
	categories: (_, { industryId }) =>
		categoryController.getCategories(industryId)
};
