import Select from "@components/ui/storybook/select/select";
import { Controller } from "react-hook-form";
import { Props } from "react-select";

export interface SelectControllerProps extends Props {
  control: any;
  rules?: any;
  name: string;
  options: object[];
  initialValue?: any;
}

const SelectController = ({
  control,
  options,
  name,
  rules,
  initialValue,
  ...rest
}: SelectControllerProps) => {
  return (
    <>
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
    </>
  );
};

export default SelectController;
