import { Model, DataTypes } from "sequelize";

import Database from "../services/database.service";
import Company from "./Company";
import Subscription from "./Subscription";

class CompanySubscription extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
CompanySubscription.init(
	{
		companyId: DataTypes.INTEGER,
		subscriptionId: DataTypes.INTEGER,
		startAt: DataTypes.BIGINT,
		endAt: DataTypes.BIGINT,
		totalPrice: DataTypes.INTEGER
	},
	{
		tableName: "company_subscriptions",
		sequelize: Database.sequelize,
		modelName: "CompanySubscription"
	}
);

CompanySubscription.belongsTo(Subscription, {
	as: "subscriptionDetail",
	foreignKey: "subscriptionId"
});

export default CompanySubscription;
