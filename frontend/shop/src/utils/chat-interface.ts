export type TChatDataResp = {
  content: string | AttachmentMsg;
  from: string;
  seq: number;
  topic: string;
  ts: Date;
};

export type TChatImageInput = {
  mime: string;
  val: string;
  name: string;
  width?: number;
  height?: number;
  size: number;
};

export type TChatFileParam = {
  mime: string;
  // The byte of the image
  // Example: <57428, bytes: PCFET0NUWVBF...eT48L2h0bWw+>
  val: string;
  name: string;
};

export type ChatAttachmentRecv = {
  mime: string;
  name: string;
  val: string;
};

export type AttachmentMsg = {
  ent: [{ data: ChatAttachmentRecv }];
  txt?: string;
};
