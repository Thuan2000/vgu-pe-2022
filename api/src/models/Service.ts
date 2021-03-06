import Database from "@services/database.service";
import OpenSearch from "@services/open-search.service";
import { successResponse, errorResponse } from "@utils/responses";
import { Model, DataTypes } from "sequelize";
import Company from "./Company";
import Tag from "./Tag";
import User from "./User";

class Service extends Model {
	private static indexName = "services";
	private static mappingProperties = {
		name: { type: "text" },
		status: { type: "keyword" },
		location: { type: "keyword" }
	};

	static createIndex() {
		try {
			OpenSearch.createIndex(
				Service.indexName,
				Service.mappingProperties
			);

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
				include: [
					{
						model: Company,
						attributes: ["id", "name", "chatId"]
					},
					Tag
				]
			});

			const srvcs = services.map(s => s.toJSON());
			if (!srvcs.length) return errorResponse("No services yet");

			OpenSearch.insertBulk(Service.indexName, srvcs);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static async insertToIndex(data: any) {
		try {
			return await OpenSearch.insertBulk(Service.indexName, [data]);
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 *
	 * @param queryBody ElasticSearch Query Body
	 * @returns [ServiceIds]
	 */
	static async getMatchSearched(queryBody) {
		const data = await OpenSearch.getSuggestion(
			Service.indexName,
			queryBody
		);

		const hits = data.body?.hits;

		const dataCount = hits?.total?.value;
		const services = hits?.hits.map(hit => hit._source);

		return { dataCount, services };
	}

	static async getNameSearchSuggestion(queryBody) {
		const suggestion = await OpenSearch.getSuggestion(
			Service.indexName,
			queryBody
		);

		return suggestion.body?.hits?.hits || [];
	}

	static async deleteEsServices(ids: number[]) {
		try {
			const data = await Promise.all(
				ids.map(id => OpenSearch.deleteDoc(Service.indexName, id))
			);

			return data;
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async updateEsService(id: number, newData) {
		try {
			return await OpenSearch.updateDoc(Service.indexName, id, newData);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
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
		// TODO: minPrice and maxPrice here does not make sense.
		minPrice: DataTypes.BIGINT,
		maxPrice: DataTypes.BIGINT,
		packages: DataTypes.JSON,
		packageRows: DataTypes.JSON,
		companyId: DataTypes.INTEGER,
		coverImage: DataTypes.JSON,
		createdById: DataTypes.INTEGER,
		updatedById: DataTypes.INTEGER,
		isSeedData: DataTypes.BOOLEAN
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
