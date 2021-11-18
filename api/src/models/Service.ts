import Database from "@services/database.service";
import { Model, DataTypes } from "sequelize";
import Tag from "./Tag";

class Service extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}

Service.init(
	{
		name: DataTypes.STRING,
		description: DataTypes.STRING,
		industryId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
		location: DataTypes.STRING,
		images: DataTypes.JSON,
		certificates: DataTypes.JSON,
		videos: DataTypes.JSON,
		price: DataTypes.INTEGER,
		packages: DataTypes.JSON,
		companyId: DataTypes.INTEGER,
		createdById: DataTypes.INTEGER,
		updatedById: DataTypes.INTEGER
	},
	{
		sequelize: Database.sequelize,
		modelName: "Service",
		tableName: "services"
	}
);

Service.belongsToMany(Tag, { through: "service_tag" });

export default Service;
