import { Model, DataTypes } from "sequelize";
import sequelize from "sequelize/types/lib/sequelize";
import Database from "../services/database.service";
import ProductDiscussionAnswer from "./ProductDiscussionAnswer";
import User from "./User";

class ProductDiscussionQuestion extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
ProductDiscussionQuestion.init(
	{
		userId: DataTypes.INTEGER,
		productId: DataTypes.INTEGER,
		question: DataTypes.TEXT,
		companyName: DataTypes.STRING
	},
	{
		sequelize: Database.sequelize,
		modelName: "ProductDiscussionQuestion",
		tableName: "product_discussion_questions"
	}
);

ProductDiscussionQuestion.belongsTo(User);
ProductDiscussionQuestion.hasMany(ProductDiscussionAnswer, {
	foreignKey: "productDiscussionQuestionId",
	as: "answers"
});

export default ProductDiscussionQuestion;
