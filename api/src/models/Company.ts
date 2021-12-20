import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";

class Company extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate() {
		// define association here
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
		ownerId: DataTypes.INTEGER,
		isFullInfo: DataTypes.BOOLEAN
	},
	{
		tableName: "companies",
		sequelize: Database.stcSequelize,
		modelName: "company"
	}
);

export default Company;
