import React, { useEffect } from "react";
import { Control, Controller } from "react-hook-form";
import NumberFormat, {
  NumberFormatProps,
  NumberFormatValues,
} from "react-number-format";
import cn from "classnames";

import { inputClasses } from "./input-config";
import InputLabel from "./input-label";
import { PlusIcon } from "@assets/icons/plus-icon";
import { MinusIcon } from "@assets/icons/minus-icon";
import { COLORS } from "@utils/colors";
import Button from "../button";

interface INumInputProps extends Partial<NumberFormatProps> {
  label?: string;
  numberQueue?: number | string;
  queueBackground?: string;
  note?: string;
  variant?: "normal" | "solid" | "outline";
  shadow?: boolean;
  error?: string;
  withIncrementor?: boolean;
  withDecrementor?: boolean;
  onChange?: (e: any) => void;
}

interface INumberInputProps extends INumInputProps {
  name: string;
  control: Control<any>;
}

const NumberInput: React.FC<INumberInputProps> = ({
  className,
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
      withIncrementor,
      withDecrementor,
      label,
      queueBackground,
      numberQueue,
      note,
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
      if ((value !== 0 && !value) || !onChange) return;
      if (max && value > max) onChange(max as any);
      else if (min && value < min) onChange(min as any);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, max, min]);

    function increment() {
      if (!onChange) return;

      if (!value) onChange(min || 1);
      else onChange((value as number) + 1);
    }

    function decrement() {
      if (!onChange) return;

      if (!value) onChange(max || 0);
      else onChange((value as number) - 1);
    }
    return (
      <>
        {label && (
          <InputLabel
            numberQueue={numberQueue}
            queueBackground={queueBackground}
            note={note}
            label={label}
            name={name}
          />
        )}
        <div className="fic">
          {withDecrementor && (
            <Button
              onClick={decrement}
              variant="custom"
              className={`border rounded-l-sm ${rootClassName} !w-fit-content !rounded-r-none`}
            >
              <MinusIcon fill={COLORS.GRAY[300]} className={`w-4 h-4`} />
            </Button>
          )}
          <NumberFormat
            className={`${rootClassName} 
              ${withIncrementor && "border-r-0 rounded-r-none"}
              ${withDecrementor && "border-l-0 rounded-l-none"}
            `}
            thousandSeparator={thousandSeparator}
            decimalSeparator={decimalSeparator}
            onValueChange={(e) => handleChange(e)}
            value={value}
            getInputRef={ref}
            {...props}
          />

          {withIncrementor && (
            <Button
              onClick={increment}
              variant="custom"
              className={`border rounded-r-sm ${rootClassName} !w-fit-content !rounded-l-none`}
            >
              <PlusIcon fill={COLORS.GRAY[300]} className={`w-4 h-4`} />
            </Button>
          )}
        </div>
        {error && (
          <p className="my-2 text-xs text-start text-red-500">{error}</p>
        )}
      </>
    );
  }
);

export default NumberInput;
