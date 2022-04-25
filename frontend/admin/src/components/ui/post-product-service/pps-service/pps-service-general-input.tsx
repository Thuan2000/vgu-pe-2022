import IndustryCategorySelect from "@components/ui/storybook/inputs/industry-category-input/industry-category-select";
import Input from "@components/ui/storybook/inputs/input";
import { IIndustry } from "@datas/industries";
import { ICategory } from "src/datas/categories";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IPostServiceFormValues } from "./pps-service-interface";
import SelectInput from "@components/ui/storybook/select-input";
import { vietnamProvinces } from "@utils/vietnam-cities";
import dynamic from "next/dynamic";

const RichTextInput = dynamic(
  import("@components/ui/storybook/inputs/rich-text-input"),
  { ssr: false }
);

interface IPPSServiceGeneralInputProps {}

const PPSServiceGeneralInput: React.FC<IPPSServiceGeneralInputProps> = () => {
  const { t } = useTranslation("form");

  const {
    register,
    formState: { errors },
    trigger,
    control,
  } = useFormContext<IPostServiceFormValues>();

  return (
    <div className="space-y-3">
      <Input
        required
        {...register("general.name")}
        label={t("serviceName-input-label")}
        numberQueue={1}
        onChange={(e) => {
          register("general.name").onChange(e);
          trigger("general.name");
        }}
        placeholder={t("serviceName-input-placeholder")}
        error={t(errors.general?.name?.message || "")}
      />
      <RichTextInput
        labelProps={{
          required: true,
          numberQueue: 2,
          label: t("postService-description-input-label"),
        }}
        control={control}
        name="general.description"
        error={t(errors.general?.description?.message || "")}
        onChange={() => {
          trigger("general.description");
        }}
      />

      <SelectInput
        label={t("post-service-location-input-label")}
        placeholder={t("post-service-location-input-placeholder")}
        numberQueue={3}
        options={vietnamProvinces}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        control={control}
        onChange={(_) => trigger("general.location")}
        name="general.location"
        required
        error={t((errors?.general?.location as any)?.message)}
      />

      <IndustryCategorySelect
        optionTextSize="xs"
        numberQueue={4}
        required
        label={t("serviceIndustryCategory-label")}
        control={control}
        onIndustryChange={() => trigger("general.industry")}
        onCategoryChange={() => trigger("general.category")}
        industryControllerName="general.industry"
        getIndustryLabel={(e: IIndustry) => t("industry:" + e.label)}
        categoryControllerName="general.category"
        getCategoryLabel={(e: ICategory) => t("category:" + e.label)}
        error={t(
          (errors.general?.industry as any)?.message ||
            (errors.general?.category as any)?.message
        )}
      />
    </div>
  );
};
export default PPSServiceGeneralInput;
