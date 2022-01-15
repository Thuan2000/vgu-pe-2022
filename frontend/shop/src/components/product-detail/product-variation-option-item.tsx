import { IVariationOption } from "@graphql/types.graphql";
import React from "react";

interface IProductVariationOptionDetailProps {
  onClick: () => void;
  value: string;
  isActive: boolean;
}

const ProductVariationOptionItem: React.FC<
  IProductVariationOptionDetailProps
> = ({ value, isActive, onClick }) => {
  return (
    <button
      className={`border px-3 p-1 rounded-sm text-gray-300 ${
        isActive && "border-primary !text-primary"
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
export default ProductVariationOptionItem;
