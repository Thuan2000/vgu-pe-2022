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
import { IPostProductFormValues } from "./pps-product-interface";

interface IPPSProductGeneralInputProps {
  register: UseFormRegister<IPostProductFormValues>;
  errors: FieldErrors<IPostProductFormValues>;
  control: Control<IPostProductFormValues>;
  trigger: UseFormTrigger<IPostProductFormValues>;
}

const PPSProductAttachmentInput: React.FC<IPPSProductGeneralInputProps> = ({
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
        label={t("postProduct-image-input-label")}
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
        label={t("postProduct-videos-input-label")}
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
        label={t("postProduct-certificates-input-label")}
        error={t((errors.attachment?.certificates as any)?.message || "")}
      />
    </div>
  );
};
export default PPSProductAttachmentInput;
