import Database from "@services/database.service";
import { Model, DataTypes } from "sequelize";
import Company from "./Company";
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
		slug: DataTypes.STRING,
		description: DataTypes.TEXT,
		industryId: DataTypes.INTEGER,
		categoryId: DataTypes.INTEGER,
		location: DataTypes.STRING,
		faqs: DataTypes.JSON,
		images: DataTypes.JSON,
		certificates: DataTypes.JSON,
		videos: DataTypes.JSON,
		price: DataTypes.BIGINT,
		minPrice: DataTypes.BIGINT,
		maxPrice: DataTypes.BIGINT,
		packages: DataTypes.JSON,
		packageRows: DataTypes.JSON,
		companyId: DataTypes.INTEGER,
		coverImage: DataTypes.JSON,
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
Service.belongsTo(Company);

export default Service;
