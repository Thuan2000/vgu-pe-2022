import ChatFunction, { IAccProps } from "@/functions/chat.function";
import CompanyController from "@controllers/company.controller";
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
					if (data?.params?.authlvl === "auth") {
						const { success } = await CompanyController.addChatId(
							approvedCompanyIds.shift(),
							data?.params?.user
						);
					}
					console.log(data);
				}
			});

			this.hi();
		});
	}

	private static hi() {
		if (!connection) return;
		this.connection?.send(JSON.stringify(ChatFunction.getHiMessage()));
	}

	static connect() {
		this.initChat();
		this.client.connect(`${this.endpoint}?apikey=${this.apiKey}`);
	}

	static createAccount(props: IAccProps) {
		try {
			// So we can add the chat id later
			approvedCompanyIds.push(props.compId);

			const accMessage = ChatFunction.generateAccMessage(props);

			// Call this asynchronously
			setTimeout(() => {
				this.connection?.send(JSON.stringify(accMessage));
			}, 10);
		} catch (error) {
			console.error(error);
		}
	}
}

export default ChatService;
