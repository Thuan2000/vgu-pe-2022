import Select from "@components/ui/storybook/select/select";
import { Controller } from "react-hook-form";
import { Props } from "react-select";

export interface SelectInputProps extends Props {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  initialValue?: any;
  // [key: string]: unknown;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  initialValue,
  ...rest
}: SelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      {...rest}
      render={({ field }) => {
        if (typeof field.value === "string") field.value = initialValue;
        return (
          <Select
            {...rest}
            {...field}
            // getOptionLabel={getOptionLabel}
            // getOptionValue={getOptionValue}
            // isMulti={isMulti}
            // isClearable={isClearable}
            // isLoading={isLoading}
            options={options}
          />
        );
      }}
    />
  );
};

export default SelectInput;
