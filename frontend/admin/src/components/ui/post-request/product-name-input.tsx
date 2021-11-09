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
  createNewOption,
  onChange: inputOnChange,
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
      render={({ field: { onChange, ...field } }) => {
        return (
          <CreateableSelect
            createNewOption={createNewOption || handleNewOptionCreation}
            onChange={(e) => {
              if (inputOnChange) inputOnChange(e, {} as any);
              onChange(e);
            }}
            {...props}
            {...field}
          />
        );
      }}
    />
  );
};
export default ProductNameSelect;
