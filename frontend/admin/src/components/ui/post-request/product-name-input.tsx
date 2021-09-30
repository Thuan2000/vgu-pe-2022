import React from "react";
import { Control, Controller } from "react-hook-form";
import { Props } from "react-select";

interface IProductNameSelect extends Props {
  control: Control<any>;
  name: string;
  onCreateOption: (value: any) => any;
}

const ProductNameSelect = ({
  control,
  name,
  options,
  ...props
}: IProductNameSelect) => {
  return (
    <Controller
      control={control}
      name={name}
      {...props}
      render={({ field }) => <div></div>}
    />
  );
};
export default ProductNameSelect;
