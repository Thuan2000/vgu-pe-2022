import Database from "@services/database.service";
import { Model, DataTypes } from "sequelize";
import Company from "./Company";
import ServiceDiscussionAnswer from "./ServiceDiscussionAnswer";
import User from "./User";

class ServiceDiscussionQuestion extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
ServiceDiscussionQuestion.init(
	{
		serviceId: DataTypes.INTEGER,
		question: DataTypes.TEXT,
		userId: {
			type: DataTypes.INTEGER,
			references: { model: User, key: "id" }
		},
		companyName: {
			type: DataTypes.STRING,
			references: { model: Company, key: "name" }
		}
	},
	{
		sequelize: Database.sequelize,
		modelName: "ServiceDiscussionQuestions",
		tableName: "service_discussion_questions"
	}
);

ServiceDiscussionQuestion.belongsTo(User);
ServiceDiscussionQuestion.hasMany(ServiceDiscussionAnswer, {
	foreignKey: "serviceDiscussionQuestionId",
	as: "answers"
});

export default ServiceDiscussionQuestion;
