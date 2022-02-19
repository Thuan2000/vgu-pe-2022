import { Model, DataTypes } from "sequelize";
import Database from "../services/database.service";

class Partner extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
Partner.init(
	{
		title: DataTypes.STRING,
		description: DataTypes.TEXT,
		logoUrl: DataTypes.STRING,
		websiteUrl: DataTypes.STRING
	},
	{
		sequelize: Database.sequelize,
		modelName: "Partner",
		tableName: "partners"
	}
);

export default Partner;
