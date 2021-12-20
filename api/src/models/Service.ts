import Database from "@services/database.service";
import OpenSearch from "@services/open-search.service";
import { successResponse, errorResponse } from "@utils/responses";
import { Model, DataTypes } from "sequelize";
import Company from "./Company";
import Tag from "./Tag";

class Service extends Model {
	private static indexName = "services";

	static insertToIndex(data: any) {
		OpenSearch.insertBulk(Service.indexName, [data]);
	}

	static createIndex() {
		try {
			OpenSearch.createIndex(Service.indexName);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static deleteIndex() {
		try {
			OpenSearch.deleteIndex(Service.indexName);
			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static async firstBulkElasticSearch() {
		try {
			const services = await Service.findAll({
				raw: true
			});
			OpenSearch.insertBulk(Service.indexName, services);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	/**
	 *
	 * @param queryBody ElasticSearch Query Body
	 * @returns [ServiceIds]
	 */
	static async getMatchSearched(queryBody) {
		const suggestion = await OpenSearch.getSuggestion(
			Service.indexName,
			queryBody
		);
		const idCount = suggestion?.body?.hits?.total?.value;
		const ids = suggestion.body?.hits?.hits.map(sug => sug?._source?.id);

		return { idCount, ids } || { idCount: 0, ids: [] };
	}

	static async getNameSearchSuggestion(queryBody) {
		const suggestion = await OpenSearch.getSuggestion(
			Service.indexName,
			queryBody
		);

		return suggestion.body?.hits?.hits || [];
	}
}

Service.init(
	{
		name: DataTypes.STRING,
		slug: DataTypes.STRING,
		description: DataTypes.TEXT,
		industryId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
		location: DataTypes.STRING,
		faqs: DataTypes.JSON,
		images: DataTypes.JSON,
		certificates: DataTypes.JSON,
		videos: DataTypes.JSON,
		price: DataTypes.BIGINT,
		minPrice: DataTypes.BIGINT,
		maxPrice: DataTypes.BIGINT,
		packages: DataTypes.JSON,
		packageRows: DataTypes.JSON,
		companyId: DataTypes.INTEGER,
		coverImage: DataTypes.JSON,
		createdById: DataTypes.INTEGER,
		updatedById: DataTypes.INTEGER
	},
	{
		sequelize: Database.sequelize,
		modelName: "Service",
		tableName: "services"
	}
);

Service.belongsToMany(Tag, { through: "service_tag" });
Service.belongsTo(Company);

export default Service;
