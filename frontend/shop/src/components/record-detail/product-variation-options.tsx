import ProductVariationOptionItem from "@components/product-detail/product-variation-option-item";
import Typography from "@components/ui/storybook/typography";
import { IVariationOption } from "@graphql/types.graphql";
import React from "react";

interface IProductVariationOptionProps {
  onSelect: (opt: IVariationOption) => void;
  options: IVariationOption[];
  name: string;
  selectedOption: any;
}

const ProductVariationOptions: React.FC<IProductVariationOptionProps> = ({
  onSelect,
  options,
  name,
  selectedOption,
}) => {
  return (
    <div className={`grid space-x-2 items-center`}>
      <Typography
        text={`${name} (${options.length})`}
        weight="light"
        size="sm"
        className="pb-2"
      />
      <div className={`fic col-auto space-x-3`}>
        {options.map(({ name, value }) => {
          const isActive = value === selectedOption[name];
          return (
            <ProductVariationOptionItem
              key={name + value + "option"}
              isActive={isActive}
              value={value}
              onClick={() => onSelect({ name, value })}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ProductVariationOptions;
