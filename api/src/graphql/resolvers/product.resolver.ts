import ProductController from "@controllers/product.controller";

const productController = new ProductController();

export const Query = {
	productNames: () => productController.getProductNames()
};
