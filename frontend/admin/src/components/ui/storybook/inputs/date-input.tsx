import React from "react";
import ReactDatepicker, { ReactDatePickerProps } from "react-datepicker";
import cn from "classnames";

import InputErrorMessage from "./input-error";
import InputLabel from "./input-label";
import { inputClasses } from "./input-config";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller } from "react-hook-form";

interface DateInputProps extends Partial<DatepickerProps> {
  label: string;
  name: string;
  control: Control<any>;
  note?: string;
  onChange?: (e: any) => void;
  numberQueue?: string | number;
  noLabel?: boolean;
  variant?: "normal" | "solid" | "outline";
  placeholder?: string;
  queueBackground?: string;
  noBorder?: boolean;
  shadow?: boolean;
  error?: string;
  inputClassName?: string;
}

interface DatepickerProps extends ReactDatePickerProps {
  initialValue?: Date;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  note,
  noLabel,
  className,
  queueBackground,
  placeholder,
  noBorder,
  shadow,
  name,
  control,
  numberQueue,
  variant = "normal",
  error,
  inputClassName,
  ...props
}) => {
  const dateClassName = cn(
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

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              {!noLabel && (
                <InputLabel
                  label={label}
                  note={note}
                  numberQueue={numberQueue}
                  queueBackground={queueBackground}
                  name={name}
                />
              )}
              <Datepicker
                className={dateClassName}
                placeholderText={placeholder}
                {...field}
                {...props}
              />
              <InputErrorMessage error={error} />
            </>
          );
        }}
      />
    </div>
  );
};
export default DateInput;

const Datepicker: React.FC<DatepickerProps> = React.forwardRef(
  ({ onChange, ...props }, ref) => {
    function handleChange(e: Date) {
      // Prevent error
      if (onChange) onChange(e, undefined);
    }
    return (
      <ReactDatepicker
        autoComplete="hide"
        selected={(props.value as any) || props.initialValue}
        onChange={handleChange}
        dateFormat={props.dateFormat || "dd/MM/yyyy"}
        {...props}
      />
    );
  }
);

Datepicker.displayName = "DateInput";
