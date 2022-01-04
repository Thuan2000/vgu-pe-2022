import React from "react";
import { Controller, UseFormTrigger } from "react-hook-form";
import Select, { ISelectProps } from "./select";

export interface ISelectInput extends ISelectProps {
  control: any;
  rules?: any;
  name: string;
}

const SelectInput: React.FC<ISelectInput> = ({
  control,
  rules,
  name,
  onChange: inputOnChange,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ...field } }) => {
        return (
          <>
            <Select
              onChange={(value) => {
                onChange(value);
                if (inputOnChange) inputOnChange(value, {} as any);
              }}
              {...props}
              {...field}
            />
          </>
        );
      }}
    />
  );
};
export default SelectInput;
