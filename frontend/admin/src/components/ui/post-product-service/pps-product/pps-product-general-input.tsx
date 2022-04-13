import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormTrigger,
  useFormContext,
} from "react-hook-form";

import { IPostProductFormValues } from "./pps-product-interface";
import { useTagsQuery } from "@graphql/tag.graphql";
import { useRouter } from "next/dist/client/router";
import { ILocale } from "@graphql/types.graphql";
import TextArea from "@components/ui/storybook/inputs/text-area";
import { ITagWithNewRecord } from "@utils/interfaces";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import LocationInput from "@components/ui/location-input/location-input";
import DocumentInput from "@components/ui/storybook/document-input";
import { getDocumentAccept } from "@utils/functions";
import { MINIMUM_PRODUCT_DESC } from "./pps-product-schema";

interface IPPSProductDetailsInputProps {}

const PPSProductGeneralInput: React.FC<IPPSProductDetailsInputProps> = ({}) => {
  const { t } = useTranslation("form");
  const {
    formState: { errors },
    control,
    trigger,
    register,
  } = useFormContext<IPostProductFormValues>();

  const descriptionError = errors.general?.description?.message;

  return (
    <div className="space-y-3">
      <div>
        <TextArea
          {...register("general.description")}
          required
          onChange={(e) => {
            register("general.description").onChange(e);
            trigger("general.description");
          }}
          label={t("postProduct-description-input-label")}
          placeholder={t("postProduct-description-input-placeholder")}
          error={
            !!descriptionError
              ? `${t(descriptionError)}: ${MINIMUM_PRODUCT_DESC}`
              : ""
          }
        />
      </div>
      <NumberInput
        label={t("minOrder-input-label")}
        control={control}
        onChange={() => {
          trigger("general.minOrder");
        }}
        required
        placeholder={t("minOrder-input-label")}
        name="general.minOrder"
        error={t(errors.general?.minOrder?.message || "")}
      />

      <DocumentInput
        required
        inputFileType="image"
        control={control}
        multiple
        name="general.images"
        onChange={(_) => trigger("general.images")}
        accept="image/*"
        label={t("postService-image-input-label")}
        error={t((errors.general?.images as any)?.message || "")}
      />

      <DocumentInput
        inputFileType="video"
        control={control}
        multiple
        name="general.videos"
        onChange={(_) => trigger("general.videos")}
        accept="video/*"
        label={t("postService-videos-input-label")}
        error={t((errors.general?.videos as any)?.message || "")}
      />

      <DocumentInput
        control={control}
        inputFileType="application"
        multiple
        name="general.certificates"
        onChange={(_) => trigger("general.certificates")}
        accept={getDocumentAccept()}
        label={t("postService-certificates-input-label")}
        error={t((errors.general?.certificates as any)?.message || "")}
      />
    </div>
  );
};
export default PPSProductGeneralInput;
