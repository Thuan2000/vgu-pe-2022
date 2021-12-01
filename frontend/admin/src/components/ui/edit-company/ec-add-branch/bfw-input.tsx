import React from "react";
import { Control, Controller } from "react-hook-form";
import { IRawBFW } from "./bfw-constants";
import BFWList, { IBFWList } from "./bfw-list";

interface IBFWInputProps extends IBFWList {
  control: Control<any>;
  name: string;
}

const BFWInput: React.FC<IBFWInputProps> = ({
  control,
  name,
  onChange: inputOnChange,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => {
        return (
          <BFWList
            onChange={(b: IRawBFW[]) => {
              onChange(b);
              if (inputOnChange) inputOnChange(b);
            }}
            {...props}
            {...field}
          />
        );
      }}
    />
  );
};
export default BFWInput;
