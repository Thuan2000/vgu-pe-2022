import Category from "@models/Category";

class CategoryController {
	static async getCategories(industryId: number) {
		const categories = await Category.findAll({ where: { industryId } });

		return categories;
	}
}

export default CategoryController;
