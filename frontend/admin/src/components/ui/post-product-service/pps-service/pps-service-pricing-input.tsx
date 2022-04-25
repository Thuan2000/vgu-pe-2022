import { PlusIcon } from "@assets/icons/plus-icon";
import Button from "@components/ui/storybook/button";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import PackagePricingInput from "@components/ui/storybook/inputs/package-pricing-input";
import ValidationError from "@components/ui/storybook/validation-error";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IPostServiceFormValues } from "./pps-service-interface";
import PPSServiceSinglePricingInput from "./pps-service-pricing-single-price";

interface IPPSServicePricingInputProps {}

export function AddButton({ onClick, label }: any) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      color="secondary-1"
      className="hover:bg-secondary-1-hover"
    >
      <PlusIcon fill={COLORS["SECONDARY-1"].DEFAULT} className="w-3 h-3 mr-2" />
      {label}
    </Button>
  );
}

const PPSServicePricingInput: React.FC<IPPSServicePricingInputProps> = ({}) => {
  const {
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useFormContext<IPostServiceFormValues>();

  const { t } = useTranslation("form");
  const [isAddingPackages, setIsAddingPackages] = useState(
    !!control._formValues.pricing?.packages
  );

  const isSinglePrice = getValues("pricing.isSinglePrice");

  function getErrorMessage() {
    const pricingError = errors?.pricing;

    if (
      !getValues("pricing.isSinglePrice") &&
      !isAddingPackages &&
      errors?.pricing
    )
      return "price-required-error";

    const packagesError = (pricingError?.packages as any)?.message;
    const priceError = pricingError?.price?.message;
    const packagePriceError =
      errors.pricing?.packages?.packages?.[0].price?.message;
    return !!priceError && !priceError?.includes("NaN")
      ? priceError
      : packagePriceError || packagesError;
  }

  function handleAddSinglePriceButton() {
    setValue("pricing.isSinglePrice", false);
    setValue("pricing.price", "" as any);
    setIsAddingPackages(true);
  }

  return (
    <div className="space-y-5 min-h-[65vh]">
      {(!isAddingPackages || isSinglePrice) && <PPSServiceSinglePricingInput />}
      <div className="space-y-2">
        <InputLabel
          numberQueue={!isAddingPackages ? 11 : 10}
          label={t("packagePricing-input-label")}
        />
        {!isAddingPackages && (
          <AddButton
            label={t("post-service-addPackage")}
            onClick={handleAddSinglePriceButton}
          />
        )}
        {isAddingPackages && (
          <PackagePricingInput
            onAbort={() => setIsAddingPackages(false)}
            control={control}
            name="pricing.packages"
          />
        )}
      </div>

      <ValidationError message={t(getErrorMessage())} />

      {/* @KEEP */}
      {/* <div className="space-y-2">
        <InputLabel label={t("groupPricing-input-label")} />
        {!isAddingGroups && (
          <AddButton
            label={t("post-service-addPackage")}
            onClick={() => setIsAddingGroups(true)}
          />
        )}
        {isAddingGroups && (
          <GroupPricingInput control={control} name="pricing.groups" />
        )}
      </div> */}
    </div>
  );
};
export default PPSServicePricingInput;
