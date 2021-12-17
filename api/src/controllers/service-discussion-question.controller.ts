import { IBrDiscussionsInput } from "@graphql/types";
import ServiceDiscussionAnswer from "@models/ServiceDiscussionAnswer";
import ServiceDiscussionQuestion from "@models/ServiceDiscussionQuestion";
import User from "@models/User";
import {
	createSuccessResponse,
	errorResponse,
	successResponse
} from "@utils/responses";

class ServiceDiscussionQuestionController {
	static async getDiscussions({ serviceId, limit, offset, sort }: any) {
		try {
			const questions = await ServiceDiscussionQuestion.findAll({
				where: { serviceId },
				limit,
				offset,
				include: [User, ServiceDiscussionAnswer]
			});

			return questions;
		} catch (error) {
			console.log(error);
			return errorResponse();
		}
	}

	static async createQuestion(input: any) {
		try {
			const question = await ServiceDiscussionQuestion.create(input);

			return createSuccessResponse(question.getDataValue("id"));
		} catch (e) {
			console.log(e);
			return errorResponse();
		}
	}
}

export default ServiceDiscussionQuestionController;
