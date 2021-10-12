import ProductName from "../models/ProductName";

class ProductController {
	async getProductNames() {
		// Fetch product names
		const productNames = await ProductName.findAll();

		return productNames;
	}
}

export default ProductController;
