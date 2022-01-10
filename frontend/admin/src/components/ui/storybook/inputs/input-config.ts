import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { IInputLabelProps } from "./input-label";

export const inputClasses = {
  root: "px-4 h-10 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-light border border-border-base focus:shadow focus:bg-light focus:border-primary",
  solid:
    "bg-light border border-border-100 focus:bg-light focus:border-primary",
  outline: "border border-border-base focus:border-primary",
  shadow: "focus:shadow",
  numberInput: "text-right",
  noBorder:
    "border-none shadow-none focus:border-none focus:shadow-none active:border-none active:shadow-none",
  disabled: "!cursor-not-allowed bg-gray-200 bg-opacity-30",
};

export interface IInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    IInputLabelProps {
  className?: string;
  inputClassName?: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  prefix?: any;
  transparentPrefix?: boolean;
  suffix?: any;
  absoluteErrorMessage?: boolean;
  noBorder?: boolean;
  valuePrefix?: string | number;
  tooltip?: string;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    IInputLabelProps {
  className?: string;
  inputClassName?: string;
  error?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
}

export const textAreaClasses = {
  root: "py-3 px-4 w-full bg-light rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-accent",
  outline: "border border-border-base focus:border-accent",
  shadow: "focus:shadow",
};
