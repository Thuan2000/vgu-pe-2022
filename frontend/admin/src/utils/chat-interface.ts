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

export type TTopicPhoto = {
  ref: string;
};

export type TUserPublic = {
  fn: string;
  photo?: TTopicPhoto;
};

export type TUserSeen = {
  ua: string;
  when: Date;
};

export type TTopic = {
  online?: boolean;
  seen?: TUserSeen;
  public: TUserPublic;
  topic: string;
  touched: Date;
  updated: Date;
  messages: { [any: number]: TChatDataResp };
};

export type TTopics = {
  [topic: string]: TTopic;
};
