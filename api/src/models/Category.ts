import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";

class Category extends Model {}

Category.init(
	{
		name: DataTypes.STRING,
		slug: DataTypes.STRING
	},
	{
		tableName: "categories",
		sequelize: Database.stcSequelize,
		modelName: "Category"
	}
);

export default Category;
