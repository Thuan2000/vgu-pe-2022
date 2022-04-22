import { unescape } from "lodash";
import { TChatFileParam, TChatImageInput } from "./chat-interface";
import { encodeString, generateUUID } from "./functions";

/**
 * To understand this functions please read this : https://github.com/tinode/chat/blob/master/docs/API.md
 */

/**
 * Hi message first call on chat to open the connection
 * @returns hiMessage
 */
export function chatGetHiMessage() {
  return JSON.stringify({
    hi: {
      id: generateUUID(),
      ver: "0.17.10",
    },
  });
}

/**
 * used to login to chat server
 * @param unique credential unique words using company Name and company ID "generateChatCredUnique(comp.name, comp.id)"
 * @returns LoginMessage
 */
export function chatGetLoginMessage(unique: string) {
  return JSON.stringify({
    login: {
      id: generateUUID(),
      scheme: "basic",
      secret: encodeString(unescape(`${unique}:${unique}`)),
    },
  });
}

/**
 * getting logged in user important data and all it's topics | subs
 * @returns Sub with me topic Message
 */
export function chatGetMeMessage() {
  return JSON.stringify({
    sub: {
      id: generateUUID(),
      topic: "me",
      get: { what: "sub desc" },
    },
  });
}

/**
 * Subscribing the chat topic
 * @param topic the topic we want to subscribe
 * @returns Sub Message
 */
export function chatGetFirstSubMessage(topic: string) {
  return JSON.stringify({
    sub: {
      id: generateUUID(),
      topic,
      get: { what: "sub desc" },
    },
  });
}

/**
 * To notify other user that we are typing
 * @param topic The topic that have one of the user typing
 * @returns note message
 */
export function chatGetNotifyTypingMessage(topic: string) {
  return JSON.stringify({
    note: {
      topic,
      what: "kp",
    },
  });
}

/**
 * To get `send message` message to server
 * @param topic Topic to send the message
 * @param content the content
 * @returns
 */
export function chatGetSendMessageMessage(topic: string, content: string) {
  return JSON.stringify({
    pub: {
      id: generateUUID(),
      noecho: true,
      topic,
      content,
    },
  });
}

/**
 * To send image file to topic
 * @param topic Topic to send the message
 * @param caption the caption of the image
 * @param image the image, see ${TImageInput}
 */
export function chatGetSendImageMessage(
  topic: string,
  caption: string,
  image: TChatImageInput
) {
  return JSON.stringify({
    pub: {
      id: generateUUID(),
      topic,
      noecho: true,
      head: { mime: "text/x-drafty" },
      content: {
        txt: caption,
        ent: [
          {
            tp: "IM",
            data: image,
          },
        ],
        fmt: [{ len: 1 }, { at: 1, len: 1, tp: "BR" }],
      },
    },
  });
}

/**
 * To send file to certain topic
 * @param topic Topic to send the message
 * @param caption the caption of the file
 * @param image the image, see ${TChatFileParam}
 */
export function chatGetSendFileMessage(
  topic: string,
  caption: string,
  file: TChatFileParam
) {
  return JSON.stringify({
    pub: {
      id: generateUUID(),
      topic,
      noecho: true,
      head: { mime: "text/x-drafty" },
      content: {
        txt: caption,
        ent: [
          {
            tp: "EX",
            data: file,
          },
        ],
        fmt: [{ at: -1 }],
      },
    },
  });
}

/**
 * Get all message from a topic
 * @param topic the topic we want to subscribe
 * @returns Sub Message
 */
export function chatGetTopicMessagesMessage(topic: string) {
  return JSON.stringify({
    sub: {
      id: generateUUID(),
      topic: topic,
      get: {
        data: { limit: 24 },
        sub: { ims: new Date() },
        desc: { ims: new Date() },
        what: "data sub desc",
      },
    },
  });
}

/**
 * Leave a message but keep subscribing
 * @param topic topic id
 * @returns Leave message
 */
export function chatGetLeaveMessage(topic: string) {
  return JSON.stringify({
    leave: {
      id: generateUUID(),
      topic,
    },
  });
}

/**
 * To unsubscribe from a topic
 * @param topic topic id
 * @returns LeaveUnsubTrue message
 */
export function chatGetUnsubscribeMessage(topic: string) {
  return JSON.stringify({
    leave: {
      id: generateUUID(),
      topic,
      unsub: true,
    },
  });
}

/**
 * getting topic last message
 * @param topic
 * @returns
 */
export function chatGetTopicLastMessage(topic: string) {
  return JSON.stringify({
    sub: {
      topic: topic,
      get: {
        data: { limit: 1 },
        what: "data",
      },
    },
  });
}

export function chatGetUpdateProfileMessage(imgUrl: string, tel: string) {
  return JSON.stringify({
    set: {
      id: generateUUID(),
      topic: "me",
      cred: { meth: "tel", val: tel },
      desc: {
        public: {
          photo: {
            data: "␡",
            ref: imgUrl,
            type: "jpeg",
          },
        },
      },
    },
    // extra: { attachments: [imgUrl] }
  });
}
