import React, { useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormTrigger,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IPostServiceFormValues } from "../pps-service-interface";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import { PlusIcon } from "@assets/icons/plus-icon";
import Button from "@components/ui/storybook/button";
import { COLORS } from "@utils/colors";
import PPSPAddPackage from "./ppsp-add-package";

interface IPPSServicePricingInputProps {
  register: UseFormRegister<IPostServiceFormValues>;
  errors: FieldErrors<IPostServiceFormValues>;
  control: Control<IPostServiceFormValues>;
  trigger: UseFormTrigger<IPostServiceFormValues>;
}

const PPSServicePricingInput: React.FC<IPPSServicePricingInputProps> = ({
  register,
  errors,
  control,
  trigger,
}) => {
  const { t } = useTranslation("form");
  const [isAddingPackage, setIsAddingPackage] = useState(false);

  return (
    <>
      <div>
        <InputLabel label={t("packagePricing-input-label")} />
        {!isAddingPackage && (
          <Button
            onClick={() => setIsAddingPackage(true)}
            variant="outline"
            className="!border-secondary-1 hover:bg-secondary-1-hover text-secondary-1"
          >
            <PlusIcon
              fill={COLORS["SECONDARY-1"].DEFAULT}
              className="w-3 h-3 mr-2"
            />
            {t("post-service-addPackage")}
          </Button>
        )}
        {isAddingPackage && <PPSPAddPackage />}
      </div>
    </>
  );
};
export default PPSServicePricingInput;
