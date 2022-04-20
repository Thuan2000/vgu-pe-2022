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

import { registerLocale, setDefaultLocale } from "react-datepicker";

// Locale setting
import vi from "date-fns/locale/vi";
import { IBuyingRequest } from "@graphql/types.graphql";
import Input from "@components/ui/storybook/inputs/input";
import DocumentInput from "@components/ui/storybook/document-input";
import IndustryCategorySelect from "@components/ui/storybook/inputs/industry-category-input/industry-category-select";
import { getIsCompanyFullInfo } from "@utils/functions";
import dynamic from "next/dynamic";

registerLocale("vi", vi);
setDefaultLocale("vi");

const RichTextInput = dynamic(
  import("@components/ui/storybook/inputs/rich-text-input"),
  { ssr: false }
);

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
  const isCompanyFullInfo = getIsCompanyFullInfo();
  return (
    <div className="md:w-2/3 space-y-3 sm:mb-5">
      <Input
        // disabled={!isCompanyFullInfo}
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

      {/* <TextArea
        label={t("post-request-description-label")}
        numberQueue={2}
        required
        placeholder={t("post-request-description-placeholder")}
        error={t(errors?.general?.description?.message || "")}
        {...register("general.description")}
        onChange={(e) => {
          register("general.description").onChange(e);
          trigger("general.description");
        }}
      /> */}

      <RichTextInput
        control={control}
        labelProps={{
          label: t("post-request-description-label"),
          numberQueue: 2,
          required: true,
        }}
        name="general.description"
        placeholder={t("post-request-description-placeholder")}
        error={t(errors?.general?.description?.message || "")}
        onChange={() => {
          trigger("general.description");
        }}
      />

      <DocumentInput
        inputFileType="image"
        // disabled={!isCompanyFullInfo}
        accept="image/*"
        note={t("post-request-gallery-note")}
        control={control}
        name="general.gallery"
        multiple
        numberQueue={3}
        label={t("post-request-gallery-label")}
        error={(errors?.general?.gallery as any)?.message}
      />

      <IndustryCategorySelect
        // disabled={!isCompanyFullInfo}
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
