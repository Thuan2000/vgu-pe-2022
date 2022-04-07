import { AttachmentMsg } from "./chat-interface";

export function getFileMsg(file: AttachmentMsg) {
  return file.ent?.[0].data;
}
