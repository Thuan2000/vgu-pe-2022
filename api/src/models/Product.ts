import { Model, DataTypes } from "sequelize";
import Database from "../services/database.service";
import OpenSearch from "../services/open-search.service";
import { successResponse, errorResponse } from "../utils";
import Company from "./Company";
import Tag from "./Tag";

class Product extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}

	private static indexName = "products";
	private static mappingProperties = {
		name: { type: "text" },
		status: { type: "keyword" },
		location: { type: "keyword" }
	};

	static createIndex() {
		try {
			OpenSearch.createIndex(
				Product.indexName,
				Product.mappingProperties
			);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static deleteIndex() {
		try {
			OpenSearch.deleteIndex(Product.indexName);
			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static async firstBulkElasticSearch() {
		try {
			const data = await Product.findAll({
				include: [
					{
						model: Company,
						attributes: ["id", "name", "chatId"]
					},
					Tag
				]
			});

			const products = data.map(s => s.toJSON());
			if (!products.length) return errorResponse("No products yet");
			OpenSearch.insertBulk(Product.indexName, products);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static async insertToIndex(data: any) {
		try {
			return await OpenSearch.insertBulk(Product.indexName, [data]);
		} catch (e) {
			console.log(e);
		}
	}

	static async getMatchSearched(queryBody) {
		const data = await OpenSearch.getSuggestion(
			Product.indexName,
			queryBody
		);

		const hits = data.body?.hits;

		const dataCount = hits?.total?.value;
		const products = hits?.hits.map(hit => hit._source);

		return { dataCount, products };
	}

	static async getNameSearchSuggestion(queryBody) {
		const suggestion = await OpenSearch.getSuggestion(
			Product.indexName,
			queryBody
		);

		return suggestion.body?.hits?.hits || [];
	}

	static async deleteEsProduct(ids: number[]) {
		try {
			const data = await Promise.all(
				ids.map(id => OpenSearch.deleteDoc(Product.indexName, id))
			);

			return data;
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async updateEsProduct(id: number, newData) {
		try {
			return await OpenSearch.updateDoc(Product.indexName, id, newData);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

Product.init(
	{
		companyId: DataTypes.INTEGER,
		name: DataTypes.STRING,
		slug: DataTypes.STRING,
		description: DataTypes.TEXT,
		minOrder: DataTypes.INTEGER,
		industryId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
		warehouseLocation: DataTypes.STRING,
		coverImage: DataTypes.JSON,
		gallery: DataTypes.JSON,
		videos: DataTypes.JSON,
		variations: DataTypes.JSON,
		minPrice: DataTypes.BIGINT,
		maxPrice: DataTypes.BIGINT,
		price: DataTypes.BIGINT,
		brandName: DataTypes.STRING,
		status: DataTypes.STRING,
		isCustom: DataTypes.BOOLEAN,
		isPreorder: DataTypes.BOOLEAN,
		baseDimension: DataTypes.JSON,
		packagedDimension: DataTypes.JSON,
		warranty: DataTypes.JSON,
		isSeedData: DataTypes.BOOLEAN
	},
	{
		sequelize: Database.sequelize,
		modelName: "product"
	}
);

Product.belongsToMany(Tag, { through: "product_tag" });
Product.belongsTo(Company);

export default Product;
