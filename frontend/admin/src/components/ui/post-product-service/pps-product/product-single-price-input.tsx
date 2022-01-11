import NumberInput from "@components/ui/storybook/inputs/number-input";
import Typography from "@components/ui/storybook/typography";
import React from "react";
import { useTranslation } from "next-i18next";
import { Control, useFormContext } from "react-hook-form";
import PPSProductInlineLabel from "./pps-product-inline-label";

interface IProductSinglePriceInputProps {
  control: Control<any>;
  name: string;
}

const ProductSinglePriceInput: React.FC<IProductSinglePriceInputProps> = ({
  control,
  name,
}) => {
  const { t } = useTranslation("form");
  const { trigger } = useFormContext();

  return (
    <div className="fic space-x-5">
      <PPSProductInlineLabel label={t("single-price-input-label")} />

      <NumberInput
        control={control}
        className={`w-full`}
        onChange={() => trigger("pricing.price")}
        suffix={` ${t("budget-sign")}`}
        name={name}
      />
    </div>
  );
};
export default ProductSinglePriceInput;
