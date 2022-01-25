import EyeIcon from "@assets/icons/eye-icon";
import EyeOffIcon from "@assets/icons/eye-off-icon";
import cn from "classnames";
import React, { InputHTMLAttributes, useState } from "react";
import Link from "./link";
import InputLabel from "./storybook/inputs/input-label";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  forgotPassHelpText?: string;
  label: string;
  name: string;
  forgotPageLink?: string;
  shadow?: boolean;
  transparentPrefix?: boolean;
  variant?: "normal" | "solid" | "outline";
  error: string | undefined;
}
const classes = {
  root: "px-4 h-9 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-green",
  solid:
    "bg-gray-100 border border-border-100 focus:bg-light focus:border-green",
  outline: "border border-border-base focus:border-green",
  shadow: "focus:shadow",
};
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      forgotPassHelpText,
      label,
      name,
      error,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      transparentPrefix,
      forgotPageLink = "",
      required,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
      },
      shadow == true && classes.shadow,
      inputClassName
    );

    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-3">
          {!!label && <InputLabel required={required} label={label} />}
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={`${rootClassName} ${transparentPrefix && "pl-8"}`}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute right-4 y-center text-body"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </label>
        </div>
        {error && (
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default PasswordInput;
