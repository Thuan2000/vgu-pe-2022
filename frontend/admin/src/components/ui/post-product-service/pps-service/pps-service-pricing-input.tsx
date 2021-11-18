import { PlusIcon } from "@assets/icons/plus-icon";
import Button from "@components/ui/storybook/button";
import GroupPricingInput from "@components/ui/storybook/inputs/group-pricing-input/group-pricing-input";
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
import { IPostServiceFormValues } from "./pps-service-interface";
import PPSServiceSinglePricingInput from "./pps-service-pricing-single-price";

interface IPPSServicePricingInputProps {
  register: UseFormRegister<IPostServiceFormValues>;
  errors: FieldErrors<IPostServiceFormValues>;
  control: Control<IPostServiceFormValues>;
  trigger: UseFormTrigger<IPostServiceFormValues>;
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

const PPSServicePricingInput: React.FC<IPPSServicePricingInputProps> = ({
  register,
  errors,
  control,
  trigger,
}) => {
  const { t } = useTranslation("form");
  const [isAddingPackages, setIsAddingPackages] = useState(
    !!control._formValues.pricing?.packages
  );

  // const [isAddingGroups, setIsAddingGroups] = useState(
  //   !!control._formValues.pricing?.groups
  // );

  return (
    <div className="space-y-5 min-h-[65vh]">
      {!isAddingPackages && <PPSServiceSinglePricingInput control={control} />}
      <div className="space-y-2">
        <InputLabel
          numberQueue={!isAddingPackages ? 9 : 8}
          label={t("packagePricing-input-label")}
        />
        {!isAddingPackages && (
          <AddButton
            label={t("post-service-addPackage")}
            onClick={() => setIsAddingPackages(true)}
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

      <ValidationError message={t((errors?.pricing as any)?.message)} />

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
