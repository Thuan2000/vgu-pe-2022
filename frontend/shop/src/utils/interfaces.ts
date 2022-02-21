import { ITagInput } from "@graphql/types.graphql";
import { Control } from "react-hook-form";

export type TSize = "xs" | "sm" | "md" | "lg" | "xl";

export type PageName =
  | "/nha-cung-cap"
  | "/dich-vu"
  | "/nhu-cau-thu-mua"
  | "/san-pham";

export type PageNameLabel = {
  [key in PageName]: any;
};

export const pageNames: PageName[] = [
  "/nha-cung-cap",
  "/dich-vu",
  "/nhu-cau-thu-mua",
  "/san-pham",
];

export interface IController {
  control: Control<any>;
  name: string;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export type FontSize = "xl" | "lg" | "md" | "sm" | "xs";
export type Background = "primary" | "secondary-1" | "error";

export interface ITagWithNewRecord extends ITagInput {
  isNewRecord?: boolean;
}

interface IChatPhoto {
  data: string;
  type: string;
}

export interface IChatSubPublic {
  // Name
  fn: string;
  photo: IChatPhoto;
  lastMessage: string;
  from: string;
  ts: Date;
  isReaded?: boolean;
}
export interface IChatSub {
  topic: string;
  public: IChatSubPublic;
  online?: boolean;
  read?: number;
  seq?: number;
  recv?: number;
}

export interface IChatTopic {
  content: string;
  topic: string;
  from: string;
  seq: number;
  ts: Date;
}
