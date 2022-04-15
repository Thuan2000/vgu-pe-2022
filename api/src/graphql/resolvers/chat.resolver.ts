import ChatController from "@controllers/chat.controller";

export const Mutation = {
	refreshChatId: () => ChatController.refreshChatIds()
};
