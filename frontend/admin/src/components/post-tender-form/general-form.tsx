import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import TextArea from "@components/ui/storybook/inputs/text-area";

import { registerLocale, setDefaultLocale } from "react-datepicker";

// Locale setting
import vi from "date-fns/locale/vi";
import { IBuyingRequest } from "@graphql/types.graphql";
import Input from "@components/ui/storybook/inputs/input";
import DocumentInput from "@components/ui/storybook/document-input";
import IndustryCategorySelect from "@components/ui/storybook/inputs/industry-category-input/industry-category-select";
registerLocale("vi", vi);
setDefaultLocale("vi");

interface IGeneralInputProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  initValue?: IBuyingRequest;
  errors?: FieldErrors<PostRequestFormValue>;
  trigger: UseFormTrigger<PostRequestFormValue>;
  getValues: UseFormGetValues<PostRequestFormValue>;
}

const GeneralForm: React.FC<IGeneralInputProps> = ({
  register,
  trigger,
  control,
  getValues,
  errors,
}) => {
  const { t } = useTranslation("form");
  return (
    <div className="md:w-2/3 space-y-3 sm:mb-5">
      <Input
        numberQueue={1}
        value={getValues("general.name")}
        prefix={`${t("requestNamePrefix-value")} - `}
        style={{
          paddingLeft: `${
            Math.min(t("requestNamePrefix-value").length) * 12.5
          }px`,
        }}
        {...register("general.name")}
        onChange={(e) => {
          register("general.name").onChange(e);
          trigger("general.name");
        }}
        className="w-full"
        autoFocus
        label={`${t("post-request-name-label")}`}
        required
        note={t("post-request-name-desc")}
        placeholder={t("post-request-name-placeholder")}
        error={t(errors?.general?.name?.message || "")}
      />

      <TextArea
        label={t("post-request-description-label")}
        // className="w-full"
        numberQueue={2}
        required
        placeholder={t("post-request-description-placeholder")}
        error={t(errors?.general?.description?.message || "")}
        {...register("general.description")}
      />

      <DocumentInput
        inputFileType="image"
        accept="image/*"
        note={t("post-request-gallery-note")}
        control={control}
        name="general.gallery"
        multiple
        numberQueue={3}
        label={t("post-request-gallery-label")}
        error={errors?.general?.gallery?.message}
      />

      <IndustryCategorySelect
        optionTextSize="xs"
        control={control}
        categoryControllerName="general.category"
        industryControllerName="general.industry"
        onIndustryChange={(_) => {
          trigger("general.industry");
        }}
        onCategoryChange={(_) => {
          trigger("general.category");
        }}
        required
        label={`${t("post-request-industry-category-label")}`}
        numberQueue={4}
        getCategoryLabel={(e) => t("category:" + e.label)}
        getIndustryLabel={(e) => t("industry:" + e.label)}
        error={
          t((errors?.general?.industry as any)?.message) ||
          t((errors?.general?.category as any)?.message)
        }
      />
    </div>
  );
};
export default GeneralForm;
