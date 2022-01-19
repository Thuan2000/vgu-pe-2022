import Database from "@services/database.service";
import { DataTypes, Model } from "sequelize";

class Banner extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
Banner.init(
	{
		title: DataTypes.STRING,
		description: DataTypes.TEXT,
		imgUrl: DataTypes.STRING
	},
	{
		sequelize: Database.sequelize,
		modelName: "Banner",
		tableName: require("../db/migrations/20220114083759-create-banner")
			.tableName
	}
);
export default Banner;
