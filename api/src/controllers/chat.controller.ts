import { getChatCreationParam } from "@/functions/chat.function";
import Company from "@models/Company";
import ChatService from "@services/chat.service";
import { errorResponse, successResponse } from "@utils/responses";

class ChatController {
	static async refreshChatIds() {
		try {
			const companies = await Company.findAll();

			companies.forEach(c => {
				ChatService.createAccount(getChatCreationParam(c.toJSON()));
			});

			return successResponse();
		} catch (error) {
			console.error(error.toString());
			return errorResponse(error.toString());
		}
	}
}

export default ChatController;
