import React from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import cn from "classnames";

import { inputClasses } from "./input-config";
import InputLabel from "./input-label";

interface INumberInputProps extends NumberFormatProps {
  numberQueue?: number;
  note?: string;
  name: string;
  variant?: "normal" | "solid" | "outline";
  shadow?: boolean;
  label?: string;
  error?: string;
}

interface INumberInpotControllerProps extends INumberInputProps {
  name: string;
  control: Control<any>;
}

const NumberInputController: React.FC<INumberInpotControllerProps> = (
  props
) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => {
        return <NumberInput {...field} {...props} />;
      }}
    />
  );
};
const NumberInput: React.FC<INumberInputProps> = ({
  numberQueue,
  note,
  label,
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

  return (
    <div className={className}>
      <InputLabel
        numberQueue={numberQueue}
        note={note}
        label={label}
        name={name}
      />
      <NumberFormat
        className={rootClassName}
        thousandSeparator="."
        decimalSeparator=","
        {...props}
      />
      {error && <p className="my-2 text-xs text-start text-red-500">{error}</p>}
    </div>
  );
};

export default NumberInputController;
