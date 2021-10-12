import { DataTypes, Model } from "sequelize";
import Database from "@services/database.service";

class ProductName extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
ProductName.init(
	{
		name: DataTypes.STRING,
		searchedCount: DataTypes.STRING
	},
	{
		tableName: "product_names",
		sequelize: Database.stcSequelize,
		modelName: "ProductName"
	}
);

export default ProductName;
