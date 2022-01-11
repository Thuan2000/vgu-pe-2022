import ProductController from "@controllers/product.controller";

export const Mutation = {
	createProduct: (_, { input }) => ProductController.createProduct(input),
	updateProduct: (_, { id, input }) =>
		ProductController.updateProduct(id, input),
	deleteProducts: (_, { ids }) => ProductController.deleteProducts(ids),
	productNameSuggestion: (_, { name, limit }) =>
		ProductController.getNameSuggestions(name, limit)
};

export const Query = {
	products: (_, { input }) => ProductController.getProducts(input),
	product: (_, { slug }) => ProductController.getProduct(slug)
};
