import { ICreateBrDiscussionAnswerInput } from "@graphql/types";
import ProductDiscussionAnswer from "@models/ProductDiscussionAnswer";
import { createSuccessResponse, errorResponse } from "@utils/responses";

class ProductDiscussionAnswerController {
	static async createAnswer(input: ICreateBrDiscussionAnswerInput) {
		try {
			const answer = await ProductDiscussionAnswer.create(input);
			return createSuccessResponse(answer.getDataValue("id"));
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

export default ProductDiscussionAnswerController;
