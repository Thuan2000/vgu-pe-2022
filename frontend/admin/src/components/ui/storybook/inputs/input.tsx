import React from "react";
import cn from "classnames";
import { inputClasses, InputProps } from "./input-config";
import InputLabel from "./input-label";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      transparentPrefix,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      inputClassName,
      numberQueue,
      prefix,
      suffix,
      noLabel,
      valuePrefix,
      noBorder,
      value,
      onChange,
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
      },
      {
        [inputClasses.shadow]: shadow,
      },
      {
        [inputClasses.noBorder]: noBorder,
      },
      inputClassName
    );

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!onChange) return;

      onChange(e);
    }

    return (
      <div className={className}>
        {!noLabel && (
          <InputLabel
            numberQueue={numberQueue}
            name={name}
            note={note}
            label={label}
          />
        )}
        <div className="flex z-0 items-center align-middle relative">
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
            onChange={handleChange}
            value={!!valuePrefix ? `${valuePrefix}${value}` : value}
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
