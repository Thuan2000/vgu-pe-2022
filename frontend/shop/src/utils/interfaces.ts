import { ITagInput } from "@graphql/types.graphql";
import { Control } from "react-hook-form";

export type PageName =
  | "nha-cung-cap"
  | "dich-vu"
  | "nhu-cau-thu-mua"
  | "san-pham";

export type PageNameLabel = {
  [key in PageName]: any;
};

export const pageNames: PageName[] = [
  "nha-cung-cap",
  "dich-vu",
  "nhu-cau-thu-mua",
  "san-pham",
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
export type Background = "primary" | "secondary-1";

export interface ITagWithNewRecord extends ITagInput {
  isNewRecord?: boolean;
}
