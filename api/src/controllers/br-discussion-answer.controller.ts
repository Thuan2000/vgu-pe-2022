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

	// static async getDiscussions({
	// 	brId,
	// 	limit,
	// 	offset,
	// 	sort
	// }: IBrDiscussionsInput) {
	// 	try {
	// 		const questions = await BRDiscussionQuestion.findAll({
	// 			where: { brId },
	// 			limit,
	// 			offset,
	// 			include: [User, BRDiscussionAnswer]
	// 		});

	// 		return questions;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return errorResponse();
	// 	}
	// }
}

export default BRDiscussionAnswerController;
