/* eslint-disable @typescript-eslint/camelcase */
import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";
import Company from "./Company";
import Project from "./Project";
import User from "./User";
import OpenSearch from "@services/open-search.service";
import { errorResponse, successResponse } from "@utils/responses";
import BRDiscussionQuestion from "./BRDiscussionQuestion";

class BuyingRequest extends Model {
	private static indexName = "buying_requests";
	private static mappingProperties = {
		name: { type: "text" },
		status: { type: "keyword" },
		location: { type: "keyword" }
	};

	static async insertToIndex(data: any) {
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
					{
						model: Company,
						include: [
							{ model: User, as: "owner", attributes: ["chatId"] }
						]
					},
					Project,
					{ model: User, as: "createdBy" }
				]
			});

			const tenders = buyingRequests.map(br => br.toJSON());
			if (!tenders.length) return errorResponse("No tenders yet");

			OpenSearch.insertBulk(BuyingRequest.indexName, tenders);

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

	static async deleteEsBrs(ids: number[]) {
		try {
			const data = await Promise.all(
				ids.map(id => OpenSearch.deleteDoc(BuyingRequest.indexName, id))
			);

			return data;
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}

	static async updateEsBr(id: number, newData) {
		try {
			return await OpenSearch.updateDoc(
				BuyingRequest.indexName,
				id,
				newData
			);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
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
BuyingRequest.belongsTo(User, { foreignKey: "createdById", as: "createdBy" });
BuyingRequest.hasMany(BRDiscussionQuestion, {
	foreignKey: "brId",
	as: "discussionQuestions"
});

export default BuyingRequest;
