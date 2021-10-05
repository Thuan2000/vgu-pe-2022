import CategoryController from "@controllers/category.controller";

const categoryController = new CategoryController();

export const Query = {
	categories: () => categoryController.getCategories()
};
