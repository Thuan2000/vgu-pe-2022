/* eslint-disable @typescript-eslint/camelcase */
import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";
import Company from "./Company";
import Category from "./Category";
import Project from "./Project";
import User from "./User";
import Industry from "./Industry";
import OpenSearch from "@services/open-search.service";
import { errorResponse, successResponse } from "@utils/responses";
import Bid from "./Bid";
import BRDiscussionQuestion from "./BRDiscussionQuestion";
import { IBuyingRequest } from "@graphql/types";

class BuyingRequest extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */

	private static indexName = "buying_requests";
	private static mappingProperties = {
		name: { type: "text" },
		status: { type: "keyword" }
	};

	static insertIndex(data: any) {
		OpenSearch.insertBulk(BuyingRequest.indexName, [data]);
	}

	static createIndex() {
		try {
			OpenSearch.createIndex(
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
			OpenSearch.deleteIndex(BuyingRequest.indexName);
			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static async firstBulkElasticSearch() {
		try {
			const buyingRequests = await BuyingRequest.findAll({
				include: [
					Company,
					Project,
					{
						model: Bid,
						as: "bids",
						attributes: ["id", "createdAt"],
						include: [{ model: Company, attributes: ["id"] }]
					},
					{ model: User, as: "createdBy" }
				]
			});

			const brs = buyingRequests.map(br => br.toJSON());

			OpenSearch.insertBulk(BuyingRequest.indexName, brs);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	/**
	 *
	 * @param queryBody ElasticSearch Query Body
	 * @returns [BuyingRequests]
	 */
	static async getMatchSearched(queryBody) {
		const suggestion = await OpenSearch.getSuggestion(
			BuyingRequest.indexName,
			queryBody
		);

		const hits = suggestion.body?.hits;

		const dataCount = hits?.total?.value;
		const brs = hits?.hits.map(hit => hit._source);

		return { dataCount, brs };
	}

	static async getNameSearchSuggestion(queryBody) {
		const suggestion = await OpenSearch.getSuggestion(
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
		description: DataTypes.TEXT,
		productName: DataTypes.STRING,
		minBudget: DataTypes.BIGINT,
		maxBudget: DataTypes.BIGINT,
		minOrder: DataTypes.INTEGER,
		unit: DataTypes.STRING,
		coverImage: DataTypes.JSON,
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
BuyingRequest.hasMany(BRDiscussionQuestion, {
	foreignKey: "brId",
	as: "discussionQuestions"
});

export default BuyingRequest;
