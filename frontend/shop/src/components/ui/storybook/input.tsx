import cn from "classnames";
import React, { InputHTMLAttributes } from "react";
import NumberLabel from "./number";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  prefix?: any;
  noPrefix?: boolean;
  suffix?: any;
  numberQueue?: number;
  noLabel?: boolean;
  noBorder?: boolean;
}
const classes = {
  root: "px-4 h-9 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0",
  normal:
    "bg-light border border-border-base focus:shadow focus:bg-light focus:border-green",
  solid: "bg-light border border-border-100 focus:bg-light focus:border-green",
  outline: "border border-border-base focus:border-green",
  shadow: "focus:shadow",
};
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      noPrefix,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      inputClassName,
      numberQueue,
      prefix,
      suffix,
      noLabel,
      noBorder,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    );

    return (
      <div className={className}>
        {!noLabel && (
          <div className="mb-3">
            <label
              htmlFor={name}
              className="flex items-center text-body-dark font-semibold text-sm leading-none"
            >
              {numberQueue && (
                <NumberLabel className="mr-2" number={numberQueue} />
              )}
              <p className="min-h-5">{label}</p>
            </label>
            {note && <p className="ml-8 text-xs text-gray-400">{note}</p>}
          </div>
        )}
        <div className="flex items-center align-middle relative">
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={`${rootClassName} ${!noPrefix && "pl-8"} ${
              noBorder && "border-none"
            }`}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />
          {prefix && (
            <label className="absolute y-center left-2 text-body">
              {prefix}
            </label>
          )}
          {suffix && (
            <label className="absolute y-center right-4 text-body">
              {suffix}
            </label>
          )}
        </div>
        {error && (
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default Input;