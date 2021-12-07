import { DataTypes, Model } from "sequelize";
import Database from "../services/database.service";
import User from "./User";

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
		slug: DataTypes.STRING,
		endDate: DataTypes.DOUBLE,
		description: DataTypes.TEXT,
		image: DataTypes.JSON,
		companyId: DataTypes.INTEGER,
		createdById: DataTypes.INTEGER,
		updatedById: DataTypes.INTEGER
	},
	{
		tableName: "projects",
		sequelize: Database.stcSequelize,
		modelName: "project"
	}
);

Project.belongsTo(User, { foreignKey: "createdById", as: "createdBy" });

export default Project;
