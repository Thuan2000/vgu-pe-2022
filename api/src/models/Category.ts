import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";

class Category extends Model {}

Category.init(
	{
		nameVn: DataTypes.STRING,
		nameEn: DataTypes.STRING
	},
	{
		tableName: "categories",
		sequelize: Database.stcSequelize,
		modelName: "category"
	}
);

export default Category;
