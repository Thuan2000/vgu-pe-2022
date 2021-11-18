import Database from "@services/database.service";
import { Model, DataTypes } from "sequelize";

class Tag extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}

Tag.init(
	{
		name: DataTypes.STRING,
		locale: DataTypes.STRING
	},
	{
		sequelize: Database.sequelize,
		modelName: "Tag",
		tableName: "tags"
	}
);

export default Tag;
