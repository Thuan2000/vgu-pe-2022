import React from "react";
import { Controller, UseFormTrigger } from "react-hook-form";
import { GetOptionLabel, GetOptionValue } from "react-select";
import InputLabel from "./input-label";
import Select, { ISelectProps } from "./select";

interface ISelectInput extends ISelectProps {
  options: any[];
  numberQueue?: number | string;
  label?: string;
  note?: string;
  loading?: boolean;
  getInitialValue?: (option: any) => any;
  queueBackground?: string;
  error?: string;
  getOptionLabel: GetOptionLabel<any>;
  getOptionValue: GetOptionValue<any>;
  onChange?: (value: any) => void;
  control: any;
  rules?: any;
  name: string;
}

const SelectInput: React.FC<ISelectInput> = ({
  label,
  className,
  numberQueue,
  queueBackground,
  note,
  error,
  loading,
  control,
  rules,
  name,
  onChange: inputOnChange,
  ...props
}) => {
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, ...field } }) => {
          return (
            <>
              {label && (
                <InputLabel
                  queueBackground={queueBackground}
                  label={label}
                  numberQueue={numberQueue}
                  note={note}
                />
              )}

              <Select
                onChange={(value) => {
                  onChange(value);
                  if (inputOnChange) inputOnChange(value);
                }}
                isLoading={loading}
                {...props}
                {...field}
              />
            </>
          );
        }}
      />

      {error && <p className="my-2 text-xs text-start text-red-500">{error}</p>}
    </div>
  );
};
export default SelectInput;
