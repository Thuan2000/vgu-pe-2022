import React from "react";
import cn from "classnames";
import { inputClasses, IInputProps } from "./input-config";
import InputLabel from "./input-label";
import { motion } from "framer-motion";
import Tooltip from "../tooltip";

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      absoluteErrorMessage,
      required,
      transparentPrefix,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      inputClassName,
      numberQueue,
      prefix,
      suffix,
      tooltip,
      noBorder,
      noteFontSize,
      labelFontSize,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      inputClasses.root,
      {
        [inputClasses.normal]: variant === "normal",
        [inputClasses.solid]: variant === "solid",
        [inputClasses.outline]: variant === "outline",
        [inputClasses.shadow]: shadow,
        [inputClasses.noBorder]: noBorder,
      },
      inputClassName
    );
    return (
      <div className={`relative ${className}`}>
        {label && (
          <InputLabel
            numberQueue={numberQueue}
            name={name}
            required={required}
            note={note}
            label={label}
            labelFontSize={labelFontSize}
            noteFontSize={noteFontSize}
          />
        )}

        {tooltip && <Tooltip text={tooltip} />}

        <div className={`${!!numberQueue && "ml-8"}`}>
          <div className="flex z-0 items-center align-middle relative ">
            <input
              id={name}
              name={name}
              type={type}
              ref={ref}
              className={`${rootClassName} ${
                (prefix || transparentPrefix) && "pl-8"
              }`}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              aria-invalid={error ? "true" : "false"}
              {...rest}
            />
            {prefix && (
              <label
                className={`absolute y-center text-sm left-4 ${
                  rest.value ? "text-dark-blue font-semibold" : "text-gray-200"
                }`}
              >
                {prefix}
              </label>
            )}
            {suffix && (
              <label className="absolute y-center right-4">{suffix}</label>
            )}
          </div>
          {error && (
            <p
              className={` ${
                absoluteErrorMessage && "absolute"
              } my-2 text-xs text-start text-red-500`}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
