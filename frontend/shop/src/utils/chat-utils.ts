import { encodeString, generateUUID } from "./functions";

export function chatGetSubsMessage() {
  return JSON.stringify({
    sub: {
      // id: "90904",
      topic: "me",
      get: {
        what: "sub",
      },
    },
  });
}

export function chatGetHiMessage() {
  return JSON.stringify({
    hi: {
      id: generateUUID(),
      ver: "0.17.10",
    },
  });
}

export function chatGetTopicWithDescMessages(chatId: string) {
  return JSON.stringify({
    sub: {
      topic: chatId,
      get: {
        data: { limit: 1 },
        what: "data desc",
      },
    },
  });
}
export function chatGetTopicMessage(chatId: string) {
  return JSON.stringify({
    sub: {
      topic: chatId,
      get: {
        data: { limit: 1 },
        what: "data",
      },
    },
  });
}

export function chatGetDescMessages(chatId: string) {
  return JSON.stringify({
    sub: {
      topic: chatId,
      get: {
        what: "desc",
      },
    },
  });
}

export function chatGetLoginMessage(username: string, password: string) {
  return JSON.stringify({
    login: {
      id: generateUUID(),
      scheme: "basic",
      secret: encodeString(`${username}:${password}`),
    },
  });
}
