import BRDiscussionQuestionController from "@controllers/br-discussion-question.controller";

export const Mutation = {
	createBRDiscussionQuestion: (_, { input }) =>
		BRDiscussionQuestionController.createQuestion(input)
};

export const Query = {
	brDiscussionQuestions: (_, { input }) =>
		BRDiscussionQuestionController.getDiscussions(input)
};
