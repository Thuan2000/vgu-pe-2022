import Database from "@services/database.service";
import { DataTypes, Model } from "sequelize";
import Company from "./Company";
import CompanySubscription from "./CompanySubscription";

class Subscription extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}

Subscription.init(
	{
		nameEn: DataTypes.STRING,
		nameVn: DataTypes.STRING,
		monthlyPrice: DataTypes.INTEGER
	},
	{
		tableName: "subscriptions",
		sequelize: Database.sequelize,
		modelName: "Subscription"
	}
);

export default Subscription;
