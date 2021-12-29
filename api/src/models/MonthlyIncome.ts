import { Model, DataTypes } from "sequelize";
import Database from "../services/database.service";

class MonthlyIncome extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
MonthlyIncome.init(
	{
		year: DataTypes.INTEGER,
		month: DataTypes.INTEGER,
		amount: DataTypes.INTEGER
	},
	{
		tableName: "monthly_incomes",
		sequelize: Database.sequelize,
		modelName: "MonthlyIncome"
	}
);
export default MonthlyIncome;
