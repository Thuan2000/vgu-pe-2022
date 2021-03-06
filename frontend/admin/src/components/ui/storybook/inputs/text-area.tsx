import cn from "classnames";
import React from "react";
import ValidationError from "../validation-error";
import { textAreaClasses, TextAreaProps } from "./input-config";
import InputLabel from "./input-label";

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      className,
      label,
      name,
      error,
      note,
      variant = "normal",
      shadow = false,
      inputClassName,
      numberQueue,
      labelFontSize,
      noteFontSize,

      required,
      ...rest
    } = props;

    const rootClassName = cn(
      textAreaClasses.root,
      {
        [textAreaClasses.normal]: variant === "normal",
        [textAreaClasses.solid]: variant === "solid",
        [textAreaClasses.outline]: variant === "outline",
      },
      {
        [textAreaClasses.shadow]: shadow,
      },
      inputClassName
    );

    return (
      <div className={className}>
        {label && (
          <InputLabel
            required={required}
            label={label}
            note={note}
            numberQueue={numberQueue}
            labelFontSize={labelFontSize}
            noteFontSize={noteFontSize}
          />
        )}
        <div className={`${!!numberQueue && "ml-8"}`}>
          <div className="flex z-0 items-center align-middle relative">
            <textarea
              id={name}
              name={name}
              className={rootClassName}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              rows={4}
              ref={ref}
              {...rest}
            />
          </div>
          {error && <ValidationError message={error} />}
        </div>
      </div>
    );
  }
);

export default TextArea;
