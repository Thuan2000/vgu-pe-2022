import ProductDiscussionAnswer from "@models/ProductDiscussionAnswer";
import ProductDiscussionQuestion from "@models/ProductDiscussionQuestion";
import User from "@models/User";
import { createSuccessResponse, errorResponse } from "@utils/responses";

class ProductDiscussionQuestionController {
	static async getDiscussions({ productId, limit, offset, sort }: any) {
		try {
			const questions = await ProductDiscussionQuestion.findAll({
				where: { productId },
				limit,
				offset,
				include: [User, ProductDiscussionAnswer]
			});

			return questions;
		} catch (error) {
			console.log(error);
			return errorResponse();
		}
	}

	static async createQuestion(input: any) {
		try {
			const question = await ProductDiscussionQuestion.create(input);

			return createSuccessResponse(question.getDataValue("id"));
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

export default ProductDiscussionQuestionController;
