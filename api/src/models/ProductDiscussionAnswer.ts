import { Model, DataTypes } from "sequelize";
import Database from "../services/database.service";
import { tableName } from "../db/migrations/20220111221136-create-product-discussion-answer";
import User from "./User";

class ProductDiscussionAnswer extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
ProductDiscussionAnswer.init(
	{
		userId: DataTypes.INTEGER,
		productDiscussionQuestionId: DataTypes.INTEGER,
		answer: DataTypes.TEXT,
		companyName: DataTypes.STRING
	},
	{
		sequelize: Database.sequelize,
		modelName: "ProductDiscussionAnswer",
		tableName
	}
);

ProductDiscussionAnswer.belongsTo(User);

export default ProductDiscussionAnswer;
