import { AttachmentMsg } from "@components/ui/chat/topic-message-item";

export type TChatDataResp = {
  content: string | AttachmentMsg;
  from: string;
  seq: number;
  topic: string;
  ts: Date;
};

export type TChatImageInput = {
  mime: string;
  // The byte of the image
  // Example: <57428, bytes: PCFET0NUWVBF...eT48L2h0bWw+>
  val: string;
  name: string;
  width: number;
  height: number;
  size: number;
};

export type TChatFileParam = {
  mime: string;
  // The byte of the image
  // Example: <57428, bytes: PCFET0NUWVBF...eT48L2h0bWw+>
  val: string;
  name: string;
};
