import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";

class Category extends Model {}

Category.init(
	{
		name: DataTypes.STRING,
		label: DataTypes.STRING,
		industryId: DataTypes.INTEGER,
		description: DataTypes.STRING
	},
	{
		tableName: "categories",
		sequelize: Database.stcSequelize,
		modelName: "category"
	}
);

export default Category;
