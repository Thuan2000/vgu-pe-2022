import { DataTypes, Model } from "sequelize";
import Database from "../services/database.service";

class Project extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	// 	// define association here
	// }
}
Project.init(
	{
		name: DataTypes.STRING,
		endDate: DataTypes.DOUBLE,
		description: DataTypes.STRING,
		buyingRequests: DataTypes.JSON,
		image: DataTypes.JSON,
		companyId: DataTypes.INTEGER,
		createdById: DataTypes.INTEGER
	},
	{
		tableName: "projects",
		sequelize: Database.stcSequelize,
		modelName: "Project"
	}
);

export default Project;
