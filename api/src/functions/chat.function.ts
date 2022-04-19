/* eslint-disable @typescript-eslint/interface-name-prefix */
import { ICompany } from "@graphql/types";
import {
	encodeString,
	generateChatCredUnique,
	generateChatPassword,
	generateUsername,
	generateUUID
} from "@utils/functions";
import { unescape } from "lodash";

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

class ChatFunction {
	static getHiMessage = () => ({
		hi: {
			id: generateUUID(),
			ver: "0.17.10"
		}
	});

	static generateAccMessage = ({
		messageId,
		compId,
		compName,
		compShortName
	}: // phoneNumber
	// email,
	IAccMessageProps) => {
		// Using company name and company id as unique this will be same with in
		const unique = generateChatCredUnique(compName, compId);

		const secret = encodeString(unescape(`${unique}:${unique}`));

		return {
			acc: {
				id: messageId,
				user: "new",
				scheme: "basic",
				secret,
				login: false,
				desc: { public: { fn: compShortName } }
				// cred: [
				// 	{ meth: "email", val: email },
				// 	{ meth: "tel", val: phoneNumber }
				// ]
			}
		};
	};
}

export function getChatCreationParam(comp: ICompany | any) {
	return {
		compId: comp.id,
		compName: comp.name,
		compShortName: comp.shortName
	};
}

export default ChatFunction;
