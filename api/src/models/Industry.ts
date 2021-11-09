import Database from "@services/database.service";
import { DataTypes, Model } from "sequelize";

class Industry extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// static associate(models) {
	// 	// define association here
	// }
}
Industry.init(
	{
		nameVn: DataTypes.STRING,
		nameEn: DataTypes.STRING
	},
	{
		tableName: "industries",
		sequelize: Database.stcSequelize,
		modelName: "industry"
	}
);

export default Industry;
