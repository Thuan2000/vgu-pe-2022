import Database from "@services/database.service";
import { Model, DataTypes } from "sequelize";
import Migration from "../db/migrations/20220325004809-create-already-paid-company";
import Company from "./Company";

class AlreadyPaidCompany extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
AlreadyPaidCompany.init(
	{
		companyId: DataTypes.INTEGER,
		isSubscribed: DataTypes.BOOLEAN,
		transferReceipt: DataTypes.JSON
	},
	{
		sequelize: Database.sequelize,
		modelName: "AlreadyPaidCompany",
		tableName: Migration.tableName
	}
);

AlreadyPaidCompany.belongsTo(Company, { as: "company" });

export default AlreadyPaidCompany;
