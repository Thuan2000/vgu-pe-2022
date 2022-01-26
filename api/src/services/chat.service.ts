import ChatFunction, { IAccProps } from "@/functions/chat.function";
import CompanyController from "@controllers/company.controller";
import { client as WebSocketClient, connection } from "websocket";

export let approvedCompanyId = null;

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
							approvedCompanyId,
							data?.params?.user
						);

						approvedCompanyId = null;
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
		approvedCompanyId = props.compId;

		setTimeout(() => {
			this.connection?.send(
				JSON.stringify(ChatFunction.generateAccMessage(props))
			);
		}, 10);
	}
}

export default ChatService;
