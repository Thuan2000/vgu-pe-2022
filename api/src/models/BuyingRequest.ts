import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";
import Industry from "./Industry";
import Company from "./Company";

class BuyingRequest extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
		BuyingRequest.belongsToMany(models.Company, {
			through: "CompanyProjects"
		});
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
		minBudget: DataTypes.INTEGER,
		maxBudget: DataTypes.INTEGER,
		minOrder: DataTypes.INTEGER,
		unit: DataTypes.STRING,
		gallery: DataTypes.JSON,
		industryId: {
			type: DataTypes.INTEGER,
			references: { model: Industry, key: "id" },
			onDelete: "CASCADE"
		},
		categoryIds: DataTypes.JSON,
		biddersLimit: DataTypes.INTEGER,
		allowedCompany: DataTypes.JSON,
		status: DataTypes.STRING,
		companyId: {
			type: DataTypes.INTEGER,
			references: { model: Company, key: "id" },
			onDelete: "CASCADE"
		},
		commentIds: DataTypes.JSON,
		bidIds: DataTypes.JSON,
		projectIds: DataTypes.JSON,
		createdById: DataTypes.INTEGER,
		updatedById: DataTypes.INTEGER
	},
	{
		tableName: "buying_requests",
		sequelize: Database.stcSequelize,
		modelName: "BuyingRequest"
	}
);

export default BuyingRequest;
