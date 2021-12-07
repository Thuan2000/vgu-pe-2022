import { IBrDiscussionsInput } from "@graphql/types";
import BRDiscussionAnswer from "@models/BRDiscussionAnswer";
import BRDiscussionQuestion from "@models/BRDiscussionQuestion";
import User from "@models/User";
import {
	createSuccessResponse,
	errorResponse,
	successResponse
} from "@utils/responses";

class BRDiscussionQuestionController {
	static async getDiscussions({
		brId,
		limit,
		offset,
		sort
	}: IBrDiscussionsInput) {
		try {
			const questions = await BRDiscussionQuestion.findAll({
				where: { brId },
				limit,
				offset,
				include: [User, BRDiscussionAnswer]
			});

			return questions;
		} catch (error) {
			console.log(error);
			return errorResponse();
		}
	}

	static async createQuestion(input: any) {
		try {
			const question = await BRDiscussionQuestion.create(input);

			return createSuccessResponse(question.getDataValue("id"));
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

export default BRDiscussionQuestionController;
