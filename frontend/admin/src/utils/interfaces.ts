import { ITagInput } from "@graphql/types.graphql";
import { Control } from "react-hook-form";

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
