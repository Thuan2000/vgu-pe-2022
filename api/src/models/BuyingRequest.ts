import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";

class BuyingRequest extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	// 	// define association here
	// }
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
		categories: DataTypes.JSON,
		allowedCompany: DataTypes.JSON,
		status: DataTypes.STRING,
		companyId: DataTypes.INTEGER,
		commentIds: DataTypes.JSON,
		bidIds: DataTypes.JSON,
		projectIds: DataTypes.JSON
	},
	{
		tableName: "buying_requests",
		sequelize: Database.stcSequelize,
		modelName: "BuyingRequest"
	}
);
export default BuyingRequest;
