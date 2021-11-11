import cn from "classnames";
import React from "react";
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
          />
        )}
        <textarea
          id={name}
          name={name}
          className={`${!!numberQueue && "ml-8"} ${rootClassName}`}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          rows={4}
          ref={ref}
          {...rest}
        />
        {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
      </div>
    );
  }
);

export default TextArea;
