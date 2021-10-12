import React from "react";
import { Control, Controller } from "react-hook-form";
import CreateableSelect, {
  ICreateableSelectProps,
} from "../storybook/createable-select/createable-select";

interface IProductNameSelect extends Partial<ICreateableSelectProps> {
  control: Control<any>;
  name: string;
  options: any[];
  createNewOption?: (label: string) => any;
}

const ProductNameSelect = ({
  control,
  name,
  options,
  createNewOption,
  // getOptionLabel,
  // getOptionValue,
  // onCreateOption,
  // label,
  // note,
  // error,
  // numberQueue,
  ...props
}: IProductNameSelect) => {
  function handleNewOptionCreation(label: string) {
    const newProductName = { name: label, searchedCount: 0 };

    return newProductName;
  }

  return (
    <Controller
      control={control}
      name={name}
      {...props}
      render={({ field }) => (
        <CreateableSelect
          createNewOption={createNewOption || handleNewOptionCreation}
          // getOptionLabel={getOptionLabel}
          // getOptionValue={getOptionValue}
          options={options}
          // label={label}
          // error={error}
          // numberQueue={numberQueue}
          // onCreateOption={onCreateOption}
          {...props}
          {...field}
        />
      )}
    />
  );
};
export default ProductNameSelect;
