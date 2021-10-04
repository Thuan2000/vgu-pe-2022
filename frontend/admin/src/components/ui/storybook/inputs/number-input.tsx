import React from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import cn from "classnames";

import { inputClasses } from "./input-config";
import InputLabel from "./input-label";

interface INumInputProps extends NumberFormatProps {
  numberQueue?: number;
  note?: string;
  name: string;
  variant?: "normal" | "solid" | "outline";
  shadow?: boolean;
  noLabel?: boolean;
  label?: string;
  error?: string;
}

interface INumberInputProps extends INumInputProps {
  name: string;
  control: Control<any>;
}

const NumberInput: React.FC<INumberInputProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        return <NumInput {...field} {...props} />;
      }}
    />
  );
};
const NumInput: React.FC<INumInputProps> = ({
  numberQueue,
  note,
  noLabel,
  label,
  onChange,
  error,
  name,
  variant = "normal",
  shadow = false,
  className,
  inputClassName,
  ...props
}) => {
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
    inputClasses.numberInput,
    inputClassName
  );

  const thousandSeparator = ".";
  const decimalSeparator = ",";

  function handleChange(e: any) {
    if (onChange) onChange(e.floatValue);
  }
  return (
    <div className={className}>
      {!noLabel && (
        <InputLabel
          numberQueue={numberQueue}
          note={note}
          label={label}
          name={name}
        />
      )}
      <NumberFormat
        className={rootClassName}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        onValueChange={(e) => handleChange(e)}
        {...props}
      />

      {error && <p className="my-2 text-xs text-start text-red-500">{error}</p>}
    </div>
  );
};

export default NumberInput;
