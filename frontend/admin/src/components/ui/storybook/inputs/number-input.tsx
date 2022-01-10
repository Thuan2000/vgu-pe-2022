import React, { useEffect } from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import cn from "classnames";

import { inputClasses } from "./input-config";
import InputLabel, { IInputLabelProps } from "./input-label";

export interface INumInputProps extends NumberFormatProps, IInputLabelProps {
  variant?: "normal" | "solid" | "outline";
  shadow?: boolean;
  error?: string;
  absoluteErrorMessage?: boolean;
  inputClassName?: string;
}

interface INumberInputProps extends INumInputProps {
  name: string;
  control: Control<any>;
}

const NumberInput: React.FC<INumberInputProps> = ({
  label,
  className,
  numberQueue,
  queueBackground,
  note,
  name,
  required,
  control,
  labelFontSize,
  onChange: inputOnChange,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field } }) => {
        return (
          <div className={className}>
            {label && (
              <InputLabel
                required={required}
                numberQueue={numberQueue}
                queueBackground={queueBackground}
                note={note}
                label={label}
                labelFontSize={labelFontSize}
                name={name}
              />
            )}
            <div className={`${!!label && "ml-8"}`}>
              <NumInput
                onChange={(e) => {
                  onChange(e);
                  if (inputOnChange) inputOnChange(e);
                }}
                {...field}
                {...props}
              />
            </div>
          </div>
        );
      }}
    />
  );
};
export const NumInput: React.FC<INumInputProps> = React.forwardRef(
  (
    {
      numberQueue,
      note,
      label,
      onChange,
      error,
      value,
      min,
      max,
      name,
      variant = "normal",
      shadow = false,
      absoluteErrorMessage,
      className,
      inputClassName,
      ...props
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
      inputClasses.numberInput,
      inputClassName
    );

    useEffect(() => {
      if (!props.defaultValue) return;

      if (onChange) onChange(props.defaultValue as any);
    }, []);

    const thousandSeparator = ".";
    const decimalSeparator = ",";

    function handleChange(e: any) {
      if (onChange) onChange(e.floatValue);
    }

    useEffect(() => {
      if ((!value && value !== 0) || !onChange) return;
      if (max && value > max) onChange(max as any);
      else if (min && value < min) onChange(min as any);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, max, min]);
    return (
      <>
        <NumberFormat
          className={rootClassName}
          thousandSeparator={thousandSeparator}
          decimalSeparator={decimalSeparator}
          onValueChange={(e) => handleChange(e)}
          value={value}
          getInputRef={ref}
          {...props}
        />
        {error && (
          <p
            className={`${
              absoluteErrorMessage && "absolute"
            } my-2 text-xs text-start text-red-500`}
          >
            {error}
          </p>
        )}
      </>
    );
  }
);

export default NumberInput;
