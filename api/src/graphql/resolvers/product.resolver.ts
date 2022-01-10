import ProductController from "@controllers/product.controller";

export const Mutation = {
	createProduct: (_, { input }) => ProductController.createProduct(input)
};

export const Query = {
	products: (_, { input }) => ProductController.getProducts(input)
};
