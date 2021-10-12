import Category from "@models/Category";

class CategoryController {
	async getCategories() {
		const categories = await Category.findAll();

		return categories;
	}
}

export default CategoryController;
