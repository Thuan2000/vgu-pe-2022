import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";

class Company extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	// 	// define association here
	// }
}
Company.init(
	{
		name: DataTypes.STRING,
		slug: DataTypes.STRING,
		licenseNumber: DataTypes.STRING,
		description: DataTypes.STRING,
		approved: DataTypes.BOOLEAN,
		coverImage: DataTypes.JSON,
		gallery: DataTypes.JSON,
		address: DataTypes.JSON,
		licenseFiles: DataTypes.JSON,
		ownerId: DataTypes.INTEGER,
		logo: DataTypes.JSON,
		settings: DataTypes.JSON
	},
	{
		tableName: "companies",
		sequelize: Database.stcSequelize,
		modelName: "Company"
	}
);
export default Company;
