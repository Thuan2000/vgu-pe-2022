import { FontSize } from "@utils/interfaces";
import React from "react";
import NumberLabel from "./queue-number";

export interface IInputLabelProps {
  numberQueue?: number | string;
  name?: string;
  note?: string;
  className?: string;
  label?: string;
  queueBackground?: string;
  required?: boolean;
  labelFontSize?: FontSize;
  noteFontSize?: FontSize;
}

const InputLabel: React.FC<IInputLabelProps> = ({
  numberQueue,
  name,
  note,
  className,
  queueBackground,
  label,
  required,
  labelFontSize,
  noteFontSize,
}) => {
  /* If required is true, append a red (*) to label */
  const requiredAppendix = required ? (
    <span
      style={{ color: "red", fontWeight: "normal" }}
      className={`text-${labelFontSize}`}
    >
      &nbsp;*
    </span>
  ) : (
    <div />
  );

  return (
    <div className={`${className} mb-2`}>
      <label
        htmlFor={name}
        className="flex items-center text-body-dark font-semibold text-sm leading-none"
      >
        {numberQueue && (
          <NumberLabel
            backgroundColor={queueBackground}
            className={`mr-2 text-${labelFontSize}`}
            number={numberQueue}
          />
        )}
        <p className={`min-h-5 text-${labelFontSize}`}>{label}</p>
        {requiredAppendix}
      </label>
      {note && (
        <p
          className={`${!!numberQueue && "ml-8"} text-${
            noteFontSize ?? "xs"
          } text-gray-400`}
        >
          {note}
        </p>
      )}
    </div>
  );
};
export default InputLabel;
