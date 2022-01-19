/* eslint-disable @typescript-eslint/interface-name-prefix */
import { encodeString, generateUsername, generateUUID } from "@utils/functions";

export interface IAccProps {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	phoneNumber: string;
	password: string;
}

class ChatFunction {
	static getHiMessage = () => ({
		hi: {
			id: generateUUID(),
			ver: "0.17.10"
		}
	});

	static generateAccMessage = ({
		firstName,
		lastName,
		email,
		userName,
		phoneNumber,
		password
	}: IAccProps) => {
		const secret = encodeString(`${generateUsername(email)}:${password}`);

		return {
			acc: {
				id: generateUUID(),
				user: "new",
				scheme: "basic",
				secret,
				login: false,
				desc: { public: { fn: `${firstName} ${lastName}` } },
				cred: [
					{ meth: "email", val: email },
					{ meth: "tel", val: phoneNumber }
				]
			}
		};
	};
}

export default ChatFunction;
