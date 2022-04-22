import { AttachmentMsg, TTopic } from "./chat-interface";

export function getFileMsg(file: AttachmentMsg) {
  return file.ent?.[0].data;
}

export function getTopicLastMessage(tpc: TTopic) {
  const messageKeys = Object.keys(tpc.messages);
  const msg = tpc.messages[parseInt(messageKeys[messageKeys.length - 1] + "")];
  return msg;
}

export function getChatTime(ts: Date) {
  const date = new Date(ts);
  const localeTime = date.toLocaleTimeString().split(" ")[0];
  let timeMeridiem = date.toLocaleTimeString().split(" ")[1];

  const hours = parseInt(localeTime.split(":")[0]);
  const minutes = parseInt(localeTime.split(":")[1]);

  if (timeMeridiem === undefined) {
    timeMeridiem = "";
  }

  return `${hours >= 10 ? hours : "0" + hours}:${
    minutes >= 10 ? minutes : "0" + minutes
  } ${timeMeridiem}`;
}
