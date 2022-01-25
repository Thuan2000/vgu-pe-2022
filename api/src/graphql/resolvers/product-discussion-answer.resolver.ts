import ProductDiscussionAnswerController from "@controllers/product-discussion-answer.controller";

export const Mutation = {
	createProductDiscussionAnswer: (_, { input }) =>
		ProductDiscussionAnswerController.createAnswer(input)
};
