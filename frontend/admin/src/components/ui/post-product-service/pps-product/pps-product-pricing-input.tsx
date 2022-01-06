import { PlusIcon } from "@assets/icons/plus-icon";
import Button from "@components/ui/storybook/button";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import Typography from "@components/ui/storybook/typography";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormTrigger,
} from "react-hook-form";
import { IPostProductFormValues } from "./pps-product-interface";
import ProductPriceInput from "./product-price-input";

interface IPPSProductPricingInputProps {
  register: UseFormRegister<IPostProductFormValues>;
  errors: FieldErrors<IPostProductFormValues>;
  control: Control<IPostProductFormValues>;
  trigger: UseFormTrigger<IPostProductFormValues>;
}

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

const PPSProductPricingInput: React.FC<IPPSProductPricingInputProps> = ({
  register,
  errors,
  control,
  trigger,
}) => {
  const { t } = useTranslation("form");
  const [isAddingPackages, setIsAddingPackages] = useState(
    !!control._formValues.pricing?.packages
  );

  return (
    <div className="space-y-5 min-h-[65vh]">
      <InputLabel
        label={t("product-price-input-label")}
        required={true}
        labelFontSize={"lg"}
      />

      <div className="fic space-x-5">
        <Typography
          weight="bold"
          color="black"
          className={`flex-shrink-0`}
          text={`${t("single-price-input-label")} : `}
        />

        <NumberInput
          control={control}
          className={`w-full`}
          suffix={` ${t("budget-sign")}`}
          name="pricing.singlePrice"
        />
      </div>

      <div className="flex items-start space-x-5">
        <Typography
          weight="bold"
          color="black"
          className={`flex-shrink-0 mt-3`}
          text={`${t("single-price-input-label")} : `}
        />

        <div className={`w-full relative`}>
          <ProductPriceInput />
          {/* <Button
            variant="outline"
            color="secondary-1"
            className="hover:!bg-secondary-1 w-full"
          >
            <PlusIcon fill={COLORS["SECONDARY-1"].DEFAULT} className={`mr-3`} />
            {t("product-pricing-add-classification-group")}
          </Button> */}
        </div>
      </div>
    </div>
  );
};
export default PPSProductPricingInput;
