import { PlusIcon } from "@assets/icons/plus-icon";
import Button from "@components/ui/storybook/button";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import PackagePricingInput from "@components/ui/storybook/inputs/package-pricing-input";
import ValidationError from "@components/ui/storybook/validation-error";
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
import PPSProductSinglePricingInput from "./pps-product-pricing-single-price";
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
      <ProductPriceInput />
    </div>
  );
};
export default PPSProductPricingInput;
