import { DataTypes, Model, Op, Sequelize } from "sequelize";
import Database from "@services/database.service";
import CompanySubscription from "./CompanySubscription";
import OpenSearch from "@services/open-search.service";
import { successResponse, errorResponse } from "@utils/responses";
import User from "./User";
import Subscription from "./Subscription";

class Company extends Model {
	static associate() {
		// define association here
	}

	private static indexName = "companies";
	private static mappingProperties = {
		name: { type: "text" },
		location: { type: "keyword" }
	};

	static insertIndex(data: any) {
		OpenSearch.insertBulk(Company.indexName, [data]);
	}

	static createIndex() {
		try {
			OpenSearch.createIndex(
				Company.indexName,
				Company.mappingProperties
			);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static deleteIndex() {
		try {
			OpenSearch.deleteIndex(Company.indexName);
			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	static async firstBulkElasticSearch() {
		try {
			const companies = await Company.findAll({
				where: {
					// Because this is super admin company
					id: {
						[Op.ne]: 1
					}
				},
				include: [
					{
						model: CompanySubscription,
						as: "subscription",
						attributes: ["startAt", "endAt", "subscriptionAttempt"],
						include: [
							{
								model: Subscription,
								as: "subscriptionDetail",
								attributes: ["nameEn", "nameVn", "monthlyPrice"]
							}
						]
					}
				]
			});

			const comps = companies.map(br => br.toJSON());
			if (!comps.length) return errorResponse("No companies yet");

			OpenSearch.insertBulk(Company.indexName, comps);

			return successResponse();
		} catch (err) {
			console.log(err);
			return errorResponse(err);
		}
	}

	/**
	 *
	 * @param queryBody ElasticSearch Query Body
	 * @returns [Companys]
	 */
	static async getMatchSearched(queryBody) {
		const suggestion = await OpenSearch.getSuggestion(
			Company.indexName,
			queryBody
		);

		const hits = suggestion.body?.hits;

		const dataCount = hits?.total?.value;
		const companies = hits?.hits.map(hit => hit._source);

		return { dataCount, companies };
	}

	static async getNameSearchSuggestion(queryBody) {
		const suggestion = await OpenSearch.getSuggestion(
			Company.indexName,
			queryBody
		);

		return suggestion.body?.hits?.hits || [];
	}

	static async updateEsCompany(id: number, newData) {
		try {
			OpenSearch.updateDoc(Company.indexName, id, newData);
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

Company.init(
	{
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		industryId: DataTypes.INTEGER,
		businessTypeIds: DataTypes.JSON,
		establishmentDate: DataTypes.DATE,
		location: DataTypes.STRING,
		membership: DataTypes.INTEGER,
		isSubscribeEmail: DataTypes.BOOLEAN,
		settings: DataTypes.JSON,
		slug: DataTypes.STRING,
		chatId: DataTypes.STRING,
		licenseNumber: DataTypes.STRING,
		licenseFiles: DataTypes.JSON,
		certificates: DataTypes.JSON,
		approved: DataTypes.BOOLEAN,
		approverId: DataTypes.INTEGER,
		ownerId: DataTypes.INTEGER,
		isFullInfo: DataTypes.BOOLEAN,
		isSeedData: DataTypes.BOOLEAN
	},
	{
		tableName: "companies",
		sequelize: Database.stcSequelize,
		modelName: "company"
	}
);

Company.hasOne(CompanySubscription, { as: "subscription" });
User.belongsTo(Company, { as: "company", foreignKey: "companyId" });
Company.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
Company.belongsTo(User, { as: "approver", foreignKey: "approverId" });

export default Company;
