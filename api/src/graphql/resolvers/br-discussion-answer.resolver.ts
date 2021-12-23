import BRDiscussionAnswerController from "@controllers/br-discussion-answer.controller";

export const Mutation = {
	createBRDiscussionAnswer: (_, { input }) =>
		BRDiscussionAnswerController.createAnswer(input)
};
