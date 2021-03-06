import React from "react";
import ReactDatepicker, { ReactDatePickerProps } from "react-datepicker";
import cn from "classnames";

import InputErrorMessage from "./input-error";
import InputLabel from "./input-label";
import { inputClasses } from "./input-config";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller, UseFormTrigger } from "react-hook-form";
import DateIcon from "@assets/icons/date-icon";

interface DateInputProps extends Partial<DatepickerProps> {
  label: string;
  name: string;
  control: Control<any>;
  note?: string;
  onChange?: (e: any) => void;
  numberQueue?: string | number;
  variant?: "normal" | "solid" | "outline";
  placeholder?: string;
  queueBackground?: string;
  noBorder?: boolean;
  shadow?: boolean;
  error?: string;
  inputClassName?: string;
  rules?: any;
  trigger?: UseFormTrigger<any>;
}

interface DatepickerProps extends ReactDatePickerProps {
  initialValue?: Date;
  rootClassName?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  note,
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
  rules,
  trigger,
  onChange: inputOnChange,
  required,
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
        rules={rules}
        render={({ field: { onChange, ...field } }) => {
          return (
            <>
              {label && (
                <InputLabel
                  label={label}
                  note={note}
                  numberQueue={numberQueue}
                  queueBackground={queueBackground}
                  name={name}
                  required={required}
                />
              )}
              <div className={`${!!numberQueue && "ml-8"}`}>
                <Datepicker
                  className={`${dateClassName}`}
                  placeholderText={placeholder}
                  onChange={(e) => {
                    onChange(e);
                    if (inputOnChange) inputOnChange(e);
                  }}
                  {...field}
                  {...props}
                />
                <InputErrorMessage error={error} />
              </div>
            </>
          );
        }}
      />
    </div>
  );
};
export default DateInput;

export const Datepicker: React.FC<DatepickerProps> = React.forwardRef(
  ({ onChange, rootClassName, ...props }, _) => {
    const inputId = Math.random().toString() + "-date-input";
    function handleChange(e: Date) {
      // Prevent error
      if (onChange) onChange(e, undefined);
    }

    function focusDateInput() {
      const dom = document.getElementById(inputId);
      dom?.focus();
    }

    return (
      <div className={`relative ${rootClassName}`}>
        <ReactDatepicker
          id={inputId}
          portalId="root-portal"
          shouldCloseOnSelect
          closeOnScroll
          autoComplete="hide"
          selected={(props.value as any) || props.initialValue}
          onChange={handleChange}
          dateFormat={props.dateFormat || "dd/MM/yyyy"}
          {...props}
        />
        <DateIcon
          onClick={focusDateInput}
          className="absolute y-center right-5 cursor-pointer"
        />
      </div>
    );
  }
);

Datepicker.displayName = "DateInput";
