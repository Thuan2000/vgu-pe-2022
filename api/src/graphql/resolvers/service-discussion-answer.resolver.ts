import ServiceDiscussionAnswerController from "@controllers/service-discussion-answer.controller";

export const Mutation = {
	createServiceDiscussionAnswer: (_, { input }) =>
		ServiceDiscussionAnswerController.createAnswer(input)
};
