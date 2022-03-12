/* eslint-disable @typescript-eslint/camelcase */
import { ICreateProductInput, IFetchProductsInput } from "@graphql/types";
import Company from "@models/Company";
import Tag from "@models/Tag";
import TagRepository from "@repositories/tag.repository";
import Product from "../models/Product";
import ProductRepository from "../repositories/product.repository";
import {
	createSuccessResponse,
	errorResponse,
	generateSlug,
	successResponse
} from "../utils";

class ProductController {
	static async createProduct(input: ICreateProductInput) {
		const {
			companyId,
			companyName,
			chatId,
			name,
			newTags,
			tags,
			...rest
		} = input;
		const existProduct = await Product.findOne({
			where: {
				companyId,
				name
			},
			attributes: ["id", "name"]
		});

		if (!!existProduct) return errorResponse("PRODUCT_IS_EXIST");

		const newProduct = await Product.create({ name, companyId, ...rest });
		const productSlug = generateSlug(name, newProduct.getDataValue("id"));
		newProduct.setDataValue("slug", productSlug);

		const company = {
			name: companyName,
			id: companyId,
			chatId
		};

		const esProduct = Object.assign(newProduct.toJSON(), {
			slug: productSlug,
			company
		});

		const r = await Product.insertToIndex(esProduct);
		TagRepository.createTags(newTags);
		(newProduct as any).setTags(tags);

		await newProduct.save();

		return createSuccessResponse(newProduct.getDataValue("id"));
	}

	static async updateProduct(
		id,
		{ newTags, tags, ...newValue }: ICreateProductInput
	) {
		const product = await Product.findByPk(id, {
			include: [Company]
		});
		const resp = await product.update(newValue);

		TagRepository.createTags(newTags);
		(product as any).setTags(tags);

		Product.updateEsProduct(id, product.toJSON());

		return successResponse();
	}

	static async getProduct(slug: string) {
		try {
			const product = await Product.findOne({
				where: { slug },
				include: [Company, Tag]
			});

			return product;
		} catch (error) {
			console.log(error);
		}
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

	static async deleteProducts(ids: number[]) {
		try {
			const r = await Product.deleteEsProduct(ids);
			await Product.destroy({ where: { id: ids } });

			return successResponse();
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async getNameSuggestions(inputName: string, limit: number) {
		const queryBody = {
			query: ProductRepository.nameSuggestionQuery(inputName),
			_source: ["name"],
			highlight: {
				tags_schema: "styled",
				fields: {
					name: {}
				}
			},
			size: limit
		};

		const rawServicesName = await Product.getNameSearchSuggestion(
			queryBody
		);

		const suggestions = rawServicesName.map(product => ({
			name: product?._source?.name,
			highlightedName: product?.highlight?.name[0]
		}));

		return suggestions;
	}
}

export default ProductController;
