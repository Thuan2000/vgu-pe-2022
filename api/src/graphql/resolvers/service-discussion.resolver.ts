import ServiceDiscussionQuestionController from "@controllers/service-discussion-question.controller";

export const Mutation = {
	createServiceDiscussionQuestion: (_, { input }) =>
		ServiceDiscussionQuestionController.createQuestion(input)
};

export const Query = {
	serviceDiscussionQuestions: (_, { input }) =>
		ServiceDiscussionQuestionController.getDiscussions(input)
};
