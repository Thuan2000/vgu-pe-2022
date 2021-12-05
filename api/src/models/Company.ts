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
		description: DataTypes.STRING,
		industryId: DataTypes.INTEGER,
		businessType: DataTypes.STRING,
		establishmentDate: DataTypes.DATE,
		settings: DataTypes.JSON,
		slug: DataTypes.STRING,
		licenseNumber: DataTypes.STRING,
		licenseFiles: DataTypes.JSON,
		approved: DataTypes.BOOLEAN,
		ownerId: DataTypes.INTEGER
	},
	{
		tableName: "companies",
		sequelize: Database.stcSequelize,
		modelName: "company"
	}
);

export default Company;
