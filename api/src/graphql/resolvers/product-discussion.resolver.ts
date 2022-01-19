import ProductDiscussionQuestionController from "@controllers/product-discussion-question.controller";

export const Mutation = {
	createProductDiscussionQuestion: (_, { input }) =>
		ProductDiscussionQuestionController.createQuestion(input)
};

export const Query = {
	productDiscussionQuestions: (_, { input }) =>
		ProductDiscussionQuestionController.getDiscussions(input)
};
