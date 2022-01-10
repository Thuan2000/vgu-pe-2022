import { ICreateProductInput, IFetchProductsInput } from "@graphql/types";
import Product from "../models/Product";
import ProductName from "../models/ProductName";
import ProductRepository from "../repositories/product.repository";
import { createSuccessResponse, errorResponse, generateSlug } from "../utils";

class ProductController {
	static async createProduct({
		companyId,
		companyName,
		name,
		...rest
	}: ICreateProductInput) {
		const existProduct = await Product.findOne({
			where: {
				companyId,
				name
			},
			attributes: ["id", "name"]
		});

		if (!!existProduct) return errorResponse("PRODUCT_IS_EXIST");

		const product = await Product.create({ name, companyId, ...rest });
		const productSlug = generateSlug(name, product.getDataValue("id"));
		product.setDataValue("slug", productSlug);

		const company = {
			name: companyName,
			id: companyId
		};

		const esProduct = Object.assign(product.toJSON(), {
			slug: productSlug,
			company
		});

		Product.insertToIndex(esProduct);
		await product.save();

		return createSuccessResponse(product.getDataValue("id"));
	}

	static async getProducts({
		offset,
		limit,
		searchValue,
		...input
	}: IFetchProductsInput) {
		try {
			const queryBody = {
				size: limit,
				from: offset,
				query: ProductRepository.getSearchQuery(searchValue, input)
			};

			const { dataCount, products } = await Product.getMatchSearched(
				queryBody
			);

			const hasMore =
				offset + products.length < dataCount &&
				products.length === limit;

			const pagination = { dataCount, hasMore };

			return { pagination, data: products };
		} catch (e) {
			console.error(e);
		}
	}
}

export default ProductController;
