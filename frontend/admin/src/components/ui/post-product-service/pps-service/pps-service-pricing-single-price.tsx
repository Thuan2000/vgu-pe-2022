import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IPostServiceFormValues } from "./pps-service-interface";
import { AddButton } from "./pps-service-pricing-input";

interface IPPSServiceSinglePropsPricingInput {}

const PPSServiceSinglePricingInput: React.FC<
  IPPSServiceSinglePropsPricingInput
> = () => {
  const { control, setValue, trigger } =
    useFormContext<IPostServiceFormValues>();
  const { t } = useTranslation("form");
  const [isSettingSinglePrice, setIsSettingSinglePrice] = useState(
    !!control._formValues.pricing?.price
  );

  function handleAddSinglePriceButton() {
    setValue("pricing.isSinglePrice", true);
    setIsSettingSinglePrice(true);
  }

  return (
    <div className="space-y-2">
      {!isSettingSinglePrice ? (
        <>
          <InputLabel numberQueue={8} label={t("singlePrice-input-label")} />
          <AddButton
            label={t("post-service-addSinglePrice")}
            onClick={handleAddSinglePriceButton}
          />
        </>
      ) : (
        <NumberInput
          numberQueue={8}
          autoFocus
          onChange={() => trigger("pricing")}
          label={t("singlePrice-input-label")}
          control={control}
          name="pricing.price"
          suffix={` ${t("budget-sign")}`}
        />
      )}
    </div>
  );
};
export default PPSServiceSinglePricingInput;
