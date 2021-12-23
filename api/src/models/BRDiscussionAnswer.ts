import Database from "@services/database.service";
import { Model, DataTypes } from "sequelize";
import User from "./User";

class BRDiscussionAnswer extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
BRDiscussionAnswer.init(
	{
		brDiscussionQuestionId: DataTypes.INTEGER,
		userId: DataTypes.INTEGER,
		companyName: DataTypes.STRING,
		answer: DataTypes.TEXT
	},
	{
		sequelize: Database.sequelize,
		modelName: "BRDiscussionAnswer",
		tableName: "br_discussion_answers"
	}
);

BRDiscussionAnswer.belongsTo(User);

export default BRDiscussionAnswer;
