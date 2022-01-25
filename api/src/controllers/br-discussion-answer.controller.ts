import { ICreateBrDiscussionAnswerInput } from "@graphql/types";
import BRDiscussionAnswer from "@models/BRDiscussionAnswer";
import { createSuccessResponse, errorResponse } from "@utils/responses";

class BRDiscussionAnswerController {
	static async createAnswer(input: ICreateBrDiscussionAnswerInput) {
		try {
			const answer = await BRDiscussionAnswer.create(input);
			return createSuccessResponse(answer.getDataValue("id"));
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

export default BRDiscussionAnswerController;
