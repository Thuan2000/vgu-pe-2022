import ChatMessages, { IAccProps } from "@/functions/chat.message";
import CompanyController from "@controllers/company.controller";
import { generateUUID } from "@utils/functions";
import { client as WebSocketClient, connection } from "websocket";

export const approvedCompanyIds: number[] = [];

class ChatService {
	private static client = new WebSocketClient();
	private static endpoint = process.env.CHAT_API_URL;
	private static apiKey = process.env.CHAT_API_KEY;
	private static connection: connection = null;

	private static initChat() {
		this.client.on("connectFailed", connection =>
			console.error(connection.message)
		);

		this.client.on("connect", connection => {
			this.connection = connection;
			console.log("Chat connected");

			connection.on("message", async message => {
				if (message.type === "utf8") {
					const data = JSON.parse(message.utf8Data).ctrl;

					if (
						data?.params?.authlvl === "auth" &&
						!data.params.token
					) {
						const { success } = await CompanyController.addChatId(
							approvedCompanyIds[data?.id],
							data?.params?.user
						);
						delete approvedCompanyIds[data?.id];
					}
					console.log(data);
				}
			});

			this.hi();
		});
	}

	private static hi() {
		if (!connection) return;
		this.connection?.send(ChatMessages.getHiMessage());
	}

	static connect() {
		this.initChat();
		this.client.connect(`${this.endpoint}?apikey=${this.apiKey}`);
	}

	static createAccount(props: IAccProps) {
		try {
			const messageId = generateUUID();
			// So we can add the chat id later
			approvedCompanyIds[messageId] = props.compId;

			const accMessage = ChatMessages.generateCreateChatAccountMessage({
				messageId,
				...props
			});

			// Call this asynchronously
			setTimeout(() => {
				this.connection?.send(accMessage);
			}, 10);
		} catch (error) {
			console.error(error);
		}
	}
}

export default ChatService;
