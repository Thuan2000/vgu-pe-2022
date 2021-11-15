import React from "react";
import { useTranslation } from "next-i18next";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormTrigger,
} from "react-hook-form";

import CreateableSelectInput from "@components/ui/storybook/createable-select/createable-select-input";
import { IPostServiceFormValues } from "./pps-service-interface";
import { industriesData } from "@utils/industries";
import SelectInput from "@components/ui/storybook/select-input";
import { vietnamCities } from "@utils/vietnam-cities";
import FAQListCreator from "@components/ui/storybook/inputs/faq-input";
import FaqInput from "@components/ui/storybook/inputs/faq-input/faq-input";

interface IPPSServiceDetailsInputProps {
  register: UseFormRegister<IPostServiceFormValues>;
  errors: FieldErrors<IPostServiceFormValues>;
  control: Control<IPostServiceFormValues>;
  trigger: UseFormTrigger<IPostServiceFormValues>;
}

const PPSServiceDetailsInput: React.FC<IPPSServiceDetailsInputProps> = ({
  register,
  errors,
  control,
  trigger,
}) => {
  const { t } = useTranslation("form");

  // @TODO remove this
  let keywordsOptLastId = 0;

  return (
    <div className="space-y-3">
      <CreateableSelectInput
        label={t("post-service-keywords-input-label")}
        placeholder={t("post-service-keywords-input-placeholder")}
        error={t((errors?.details?.keywords as any)?.message)}
        isMulti
        control={control}
        name={"details.keywords"}
        getOptionLabel={(o) => o.label}
        getOptionValue={(o) => o.id}
        options={[]}
        createNewOption={(label) => ({ id: ++keywordsOptLastId, label })}
      />

      <SelectInput
        label={t("post-service-location-input-label")}
        placeholder={t("post-service-location-input-placeholder")}
        options={vietnamCities}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        control={control}
        required
        name="details.location"
      />

      <FaqInput
        control={control}
        name="details.faqs"
        label={t("post-service-faq-input-label")}
      />
    </div>
  );
};
export default PPSServiceDetailsInput;
