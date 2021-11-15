import React from "react";
import { Control, Controller } from "react-hook-form";
import CreateableSelect, { ICreateableSelectProps } from "./createable-select";

interface ICreateableSelectInputProps extends ICreateableSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (e: any) => void;
}

const CreateableSelectInput: React.FC<ICreateableSelectInputProps> = ({
  control,
  name,
  onChange: inputOnChange,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <CreateableSelect
          onChange={(e) => {
            onChange(e);
            if (inputOnChange) inputOnChange(e);
          }}
          {...props}
          {...field}
        />
      )}
    />
  );
};
export default CreateableSelectInput;
