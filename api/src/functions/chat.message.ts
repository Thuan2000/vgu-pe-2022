/* eslint-disable @typescript-eslint/interface-name-prefix */
import {
	generateChatCredUnique,
	generateChatSecret,
	generateUUID
} from "@utils/functions";

export interface IAccProps {
	compId: number;
	compShortName: string;
	compName: string;
	// email: string;
	// phoneNumber: string;
}

interface IAccMessageProps extends IAccProps {
	messageId: string;
}

class ChatMessages {
	static getHiMessage = () =>
		JSON.stringify({
			hi: {
				id: generateUUID(),
				ver: "0.17.10"
			}
		});

	static getLoginMessage = (secret: string) =>
		JSON.stringify({
			login: {
				id: generateUUID(),
				scheme: "basic",
				secret
			}
		});

	static fastSub() {
		return JSON.stringify({
			sub: {
				id: generateUUID(),
				topic: "me",
				bkg: true
			}
		});
	}

	static getUpdateTelMessage(topic: string, imgUrl: string) {
		return JSON.stringify({
			set: {
				id: "129692",
				topic: "me"
			}
		});
	}

	static generateCreateChatAccountMessage = ({
		messageId,
		compId,
		compName,
		compShortName
	}: // phoneNumber
	// email,
	IAccMessageProps) => {
		// Using company name and company id as unique this will be same with in
		const unique = generateChatCredUnique(compName, compId);
		const secret = generateChatSecret(unique);

		return JSON.stringify({
			acc: {
				id: messageId,
				user: "new",
				scheme: "basic",
				secret,
				login: false,
				desc: { public: { fn: compShortName } }
			}
		});
	};
}

export default ChatMessages;
