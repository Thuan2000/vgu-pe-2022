import { ICreateBrDiscussionAnswerInput } from "@graphql/types";
import ServiceDiscussionAnswer from "@models/ServiceDiscussionAnswer";
import { createSuccessResponse, errorResponse } from "@utils/responses";

class ServiceDiscussionAnswerController {
	static async createAnswer(input: ICreateBrDiscussionAnswerInput) {
		try {
			const answer = await ServiceDiscussionAnswer.create(input);
			return createSuccessResponse(answer.getDataValue("id"));
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

export default ServiceDiscussionAnswerController;
