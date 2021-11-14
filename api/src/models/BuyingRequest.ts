/* eslint-disable @typescript-eslint/camelcase */
import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";
import Company from "./Company";
import Category from "./Category";
import Project from "./Project";
import User from "./User";
import Industry from "./Industry";
import ElasticSearch from "@services/elastic-search.service";
import { errorResponse, successResponse } from "@utils/responses";
import Bid from "./Bid";

class BuyingRequest extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */

	private static indexName = "buying_requests";
	private static mappingProperties = {
		id: { type: "integer" },
		name: { type: "text" }
	};

	static createIndex() {
		try {
			ElasticSearch.createIndex(
				BuyingRequest.indexName,
				BuyingRequest.mappingProperties
			);
			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static deleteIndex() {
		try {
			ElasticSearch.deleteIndex(BuyingRequest.indexName);
			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static async bulkInsert() {
		try {
			const buyingRequests = await BuyingRequest.findAll({
				raw: true,
				attributes: ["id", "name", "productName", "description"]
			});
			ElasticSearch.insertBulk(BuyingRequest.indexName, buyingRequests);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	/**
	 *
	 * @param queryBody ElasticSearch Query Body
	 * @returns [BuyingRequestIds]
	 */
	static async getMatchSearched(queryBody) {
		const suggestion = await ElasticSearch.getSuggestion(
			BuyingRequest.indexName,
			queryBody
		);
		const idCount = suggestion?.body?.hits?.total?.value;
		const ids = suggestion.body?.hits?.hits.map(sug => sug?._source?.id);

		return { idCount, ids } || { idCount: 0, ids: [] };
	}

	static async getNameSearchSuggestion(queryBody) {
		const suggestion = await ElasticSearch.getSuggestion(
			BuyingRequest.indexName,
			queryBody
		);

		return suggestion.body?.hits?.hits || [];
	}
}

BuyingRequest.init(
	{
		name: DataTypes.STRING,
		slug: DataTypes.STRING,
		endDate: DataTypes.DOUBLE,
		location: DataTypes.STRING,
		description: DataTypes.STRING,
		productName: DataTypes.STRING,
		minBudget: DataTypes.BIGINT,
		maxBudget: DataTypes.BIGINT,
		minOrder: DataTypes.INTEGER,
		unit: DataTypes.STRING,
		gallery: DataTypes.JSON,
		biddersLimit: DataTypes.INTEGER,
		minSupplierExperience: DataTypes.INTEGER,
		minSupplierSells: DataTypes.INTEGER,
		status: DataTypes.STRING,
		industryId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
		companyId: DataTypes.INTEGER,
		createdById: DataTypes.INTEGER,
		updatedById: DataTypes.INTEGER,
		lastOpened: DataTypes.DATE,
		sourceTypeId: DataTypes.INTEGER
	},
	{
		tableName: "buying_requests",
		sequelize: Database.stcSequelize,
		modelName: "buyingRequest"
	}
);

BuyingRequest.belongsToMany(Category, { through: "br_category" });

BuyingRequest.belongsToMany(Project, {
	through: "br_project",
	onDelete: "CASCADE"
});
// @TODO find way to declare this on his own declaration
// Since now it has weird error
Project.belongsToMany(BuyingRequest, {
	through: "br_project",
	onDelete: "CASCADE"
});

BuyingRequest.belongsTo(Company, { foreignKey: "companyId" });
BuyingRequest.belongsTo(Industry, { foreignKey: "industryId" });
BuyingRequest.belongsTo(User, { foreignKey: "createdById", as: "createdBy" });

export default BuyingRequest;
