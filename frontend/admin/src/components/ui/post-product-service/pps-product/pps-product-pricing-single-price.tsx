import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import PackagePricingInput from "@components/ui/storybook/inputs/package-pricing-input";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { Control } from "react-hook-form";
import { IPostProductFormValues } from "./pps-product-interface";
import { AddButton } from "./pps-product-pricing-input";

interface IPPSProductSinglePropsPricingInput {
  control: Control<IPostProductFormValues>;
}

const PPSProductSinglePricingInput: React.FC<IPPSProductSinglePropsPricingInput> =
  ({ control }) => {
    const { t } = useTranslation("form");
    const [isSettingSinglePrice, setIsSettingSinglePrice] = useState(
      !!control._formValues.pricing?.price
    );
    return (
      <div className="space-y-2">
        {!isSettingSinglePrice ? (
          <>
            <InputLabel numberQueue={8} label={t("singlePrice-input-label")} />
            <AddButton
              label={t("post-product-addSinglePrice")}
              onClick={() => setIsSettingSinglePrice(true)}
            />
          </>
        ) : (
          <NumberInput
            numberQueue={8}
            autoFocus
            label={t("singlePrice-input-label")}
            control={control}
            name="pricing.price"
            suffix={` ${t("budget-sign")}`}
          />
        )}
      </div>
    );
  };
export default PPSProductSinglePricingInput;
