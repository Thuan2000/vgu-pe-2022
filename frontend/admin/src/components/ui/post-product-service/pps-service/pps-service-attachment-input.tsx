import DocumentInput from "@components/ui/storybook/document-input";
import TextArea from "@components/ui/storybook/inputs/text-area";
import { getDocumentAccept } from "@utils/functions";
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

const PPSServiceAttachmentInput: React.FC<IPPSServiceGeneralInputProps> = ({
  errors,
  control,
  trigger,
}) => {
  const { t } = useTranslation("form");
  return (
    <div className="space-y-3">
      <DocumentInput
        inputFileType="image"
        control={control}
        numberQueue={2}
        multiple
        name="attachment.images"
        onChange={(_) => trigger("attachment.images")}
        accept="image/*"
        label={t("postService-image-input-label")}
        error={t((errors.attachment?.images as any)?.message || "")}
      />

      <DocumentInput
        inputFileType="video"
        control={control}
        numberQueue={3}
        multiple
        name="attachment.videos"
        onChange={(_) => trigger("attachment.videos")}
        accept="video/*"
        label={t("postService-videos-input-label")}
        error={t((errors.attachment?.videos as any)?.message || "")}
      />

      <DocumentInput
        inputFileType="application"
        control={control}
        required
        multiple
        numberQueue={4}
        name="attachment.certificates"
        onChange={(_) => trigger("attachment.certificates")}
        accept={getDocumentAccept()}
        label={t("postService-certificates-input-label")}
        error={t((errors.attachment?.certificates as any)?.message || "")}
      />
    </div>
  );
};
export default PPSServiceAttachmentInput;
