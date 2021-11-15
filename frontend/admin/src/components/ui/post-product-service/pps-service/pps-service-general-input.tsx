import DocumentInput from "@components/ui/storybook/document-input";
import TextArea from "@components/ui/storybook/inputs/text-area";
import { useTranslation } from "next-i18next";
import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormTrigger,
} from "react-hook-form";
import { IPostServiceFormValues } from "./pps-service-interface";

interface IPPSServiceGeneralInputProps {
  register: UseFormRegister<IPostServiceFormValues>;
  errors: FieldErrors<IPostServiceFormValues>;
  control: Control<IPostServiceFormValues>;
  trigger: UseFormTrigger<IPostServiceFormValues>;
}

const PPSServiceGeneralInput: React.FC<IPPSServiceGeneralInputProps> = ({
  register,
  errors,
  control,
  trigger,
}) => {
  const { t } = useTranslation("form");

  return (
    <>
      <TextArea
        {...register("general.description")}
        required
        numberQueue={1}
        label={t("postService-description-input-label")}
      />

      <DocumentInput
        control={control}
        numberQueue={2}
        required
        multiple
        name="general.images"
        accept="image/*"
        label={t("postService-image-input-label")}
      />

      <DocumentInput
        control={control}
        numberQueue={3}
        name="general.videos"
        accept="video/*"
        label={t("postService-videos-input-label")}
      />

      <DocumentInput
        control={control}
        required
        numberQueue={4}
        name="general.certificates"
        accept=".pdf, .doc, .xls"
        label={t("postService-certificates-input-label")}
      />
    </>
  );
};
export default PPSServiceGeneralInput;
