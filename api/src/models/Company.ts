import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";
import CompanySubscription from "./CompanySubscription";
import OpenSearch from "@services/open-search.service";
import { successResponse, errorResponse } from "@utils/responses";
import User from "./User";

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
			const companies = await Company.findAll();

			const comps = companies.map(br => br.toJSON());

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
		settings: DataTypes.JSON,
		slug: DataTypes.STRING,
		licenseNumber: DataTypes.STRING,
		licenseFiles: DataTypes.JSON,
		certificates: DataTypes.JSON,
		approved: DataTypes.BOOLEAN,
		approverId: DataTypes.INTEGER,
		ownerId: DataTypes.INTEGER,
		isFullInfo: DataTypes.BOOLEAN
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
