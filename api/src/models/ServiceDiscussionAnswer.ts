import Database from "@services/database.service";
import { Model, DataTypes } from "sequelize";

class ServiceDiscussionAnswer extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
ServiceDiscussionAnswer.init(
	{
		serviceDiscussionQuestionId: DataTypes.INTEGER,
		userId: DataTypes.INTEGER,
		companyName: DataTypes.STRING,
		answer: DataTypes.TEXT
	},
	{
		sequelize: Database.sequelize,
		modelName: "ServiceDiscussionAnswer",
		tableName: "service_discussion_answers"
	}
);

export default ServiceDiscussionAnswer;
