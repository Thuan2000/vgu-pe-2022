import React, { useEffect } from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
} from "react-number-format";
import cn from "classnames";

import { inputClasses } from "./input-config";
import InputLabel from "./input-label";

interface INumInputProps extends Partial<NumberFormatProps> {
  numberQueue?: number | string;
  queueBackground?: string;
  note?: string;
  variant?: "normal" | "solid" | "outline";
  shadow?: boolean;
  label?: string;
  error?: string;
  onChange?: (e: any) => void;
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
  control,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className={className}>
            {label && (
              <InputLabel
                numberQueue={numberQueue}
                queueBackground={queueBackground}
                note={note}
                label={label}
                name={name}
              />
            )}
            <NumInput {...field} {...props} />
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
      className: inputClassName,
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

    const thousandSeparator = ".";
    const decimalSeparator = ",";

    function handleChange(e: NumberFormatValues) {
      if (onChange) onChange(e.floatValue as any);
    }

    useEffect(() => {
      if (!value || !onChange) return;
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
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </>
    );
  }
);

export default NumberInput;
