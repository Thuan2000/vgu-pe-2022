import Database from "@services/database.service";
import { Model, DataTypes } from "sequelize";
import BRDiscussionAnswer from "./BRDiscussionAnswer";
import User from "./User";

class BRDiscussionQuestion extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
BRDiscussionQuestion.init(
	{
		brId: DataTypes.INTEGER,
		question: DataTypes.TEXT,
		userId: DataTypes.INTEGER,
		companyName: DataTypes.STRING
	},
	{
		sequelize: Database.sequelize,
		modelName: "BRDiscussion",
		tableName: "br_discussion_questions"
	}
);

BRDiscussionQuestion.belongsTo(User);
BRDiscussionQuestion.hasMany(BRDiscussionAnswer, {
	foreignKey: "brDiscussionQuestionId"
});

export default BRDiscussionQuestion;
