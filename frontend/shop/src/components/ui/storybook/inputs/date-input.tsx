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
  control: Control<any>;
  onChange?: (e: any) => void;
  rules?: any;
  name: string;
  trigger?: UseFormTrigger<any>;
}

interface DatepickerProps extends ReactDatePickerProps {
  initialValue?: Date;
  label?: string;
  numberQueue?: string | number;
  queueBackground?: string;
  noBorder?: boolean;
  inputClassName?: string;
  variant?: "normal" | "solid" | "outline";
  shadow?: boolean;
  note?: string;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  className,
  name,
  control,
  inputClassName,
  rules,
  trigger,
  ...props
}) => {
  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, ...field } }) => {
          return (
            <>
              <Datepicker
                onChange={(e) => {
                  onChange(e);
                  if (trigger) trigger(name);
                }}
                {...field}
                {...props}
              />
            </>
          );
        }}
      />
    </div>
  );
};
export default DateInput;

export const Datepicker: React.FC<DatepickerProps> = React.forwardRef(
  (
    {
      className,
      onChange,
      label,
      note,
      queueBackground,
      numberQueue,
      name,
      noBorder,
      variant = "normal",
      error,
      shadow,
      inputClassName,
      ...props
    },
    _
  ) => {
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
      <>
        {label && (
          <InputLabel
            label={label}
            note={note}
            numberQueue={numberQueue}
            queueBackground={queueBackground}
            name={name}
          />
        )}
        <div className="relative">
          <ReactDatepicker
            id={inputId}
            shouldCloseOnSelect
            closeOnScroll
            autoComplete="hide"
            className={dateClassName}
            selected={(props.value as any) || props.initialValue}
            onChange={handleChange}
            dateFormat={props.dateFormat || "dd/MM/yyyy"}
            {...props}
          />
          <DateIcon
            onClick={focusDateInput}
            className="absolute y-center right-5 cursor-pointer"
          />
          <InputErrorMessage error={error} />
        </div>
      </>
    );
  }
);

Datepicker.displayName = "DateInput";
