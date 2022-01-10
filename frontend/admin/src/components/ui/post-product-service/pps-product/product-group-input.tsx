import { useTranslation } from "next-i18next";
import React from "react";
import { Control, Controller } from "react-hook-form";
import ProductGroupManager, {
  IProductGroupManagerProps,
} from "./product-group-manager";

interface IProductPackagePriceInputProps
  extends Partial<IProductGroupManagerProps> {
  control: Control<any>;
  name: string;
}

const ProductGroupInput: React.FC<IProductPackagePriceInputProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <ProductGroupManager onChange={onChange} value={value} {...props} />
      )}
    />
  );
};
export default ProductGroupInput;
