import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormTrigger,
} from "react-hook-form";

import CreateableSelectInput from "@components/ui/storybook/createable-select/createable-select-input";
import { IPostProductFormValues } from "./pps-product-interface";
import FaqInput from "@components/ui/storybook/inputs/faq-input/faq-input";
import { useTagsQuery } from "@graphql/tag.graphql";
import { useRouter } from "next/dist/client/router";
import { ILocale } from "@graphql/types.graphql";
import TextArea from "@components/ui/storybook/inputs/text-area";
import { ITagWithNewRecord } from "@utils/interfaces";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import LocationInput from "@components/ui/location-input/location-input";
import DocumentInput from "@components/ui/storybook/document-input";
import { getDocumentAccept } from "@utils/functions";

interface IPPSProductDetailsInputProps {
  register: UseFormRegister<IPostProductFormValues>;
  errors: FieldErrors<IPostProductFormValues>;
  control: Control<IPostProductFormValues>;
  trigger: UseFormTrigger<IPostProductFormValues>;
}

const PPSProductDetailsInput: React.FC<IPPSProductDetailsInputProps> = ({
  errors,
  control,
  trigger,
  register,
}) => {
  const { t } = useTranslation("form");
  const { locale } = useRouter();
  const firstRun = useRef(true);

  const { data, refetch } = useTagsQuery({
    variables: { locale: locale as any },
  });
  const tagsWithoutTypename = data?.tags
    ? data?.tags?.map(({ __typename, ...t }: any) => ({ locale, ...t }))
    : [];

  const [tags, setTags] = useState(tagsWithoutTypename);

  useEffect(() => {
    refetch({ locale: locale as any });
  }, []);

  useEffect(() => {
    if (firstRun.current) firstRun.current = false;
    else setTags(data?.tags || []);
  }, [data?.tags]);

  function createNewTag(name: string) {
    const newTag: ITagWithNewRecord = {
      name,
      locale: locale as ILocale,
      isNewRecord: true,
    };

    return newTag;
  }

  return (
    <div className="space-y-3">
      <TextArea
        {...register("details.description")}
        required
        onChange={(e) => {
          register("details.description").onChange(e);
          trigger("details.description");
        }}
        numberQueue={1}
        label={t("postProduct-description-input-label")}
        error={t(errors.details?.description?.message || "")}
      />

      <NumberInput
        label={t("minOrder-input-label")}
        numberQueue={2}
        control={control}
        onChange={() => {
          trigger("details.minOrder");
        }}
        required
        name="details.minOrder"
        error={t(errors.details?.minOrder?.message || "")}
      />

      <LocationInput
        label={t("minOrder-input-label")}
        numberQueue={3}
        required
        control={control}
        name="details.location"
        onChange={() => {
          trigger("details.location");
        }}
      />

      <DocumentInput
        required
        inputFileType="image"
        control={control}
        numberQueue={4}
        multiple
        name="details.images"
        onChange={(_) => trigger("details.images")}
        accept="image/*"
        label={t("postService-image-input-label")}
        error={t((errors.details?.images as any)?.message || "")}
      />

      <DocumentInput
        required
        inputFileType="video"
        control={control}
        numberQueue={5}
        multiple
        name="details.videos"
        onChange={(_) => trigger("details.videos")}
        accept="video/*"
        label={t("postService-videos-input-label")}
        error={t((errors.details?.videos as any)?.message || "")}
      />

      <DocumentInput
        required
        control={control}
        inputFileType="application"
        multiple
        numberQueue={6}
        name="details.certificates"
        onChange={(_) => trigger("details.certificates")}
        accept={getDocumentAccept()}
        label={t("postService-certificates-input-label")}
        error={t((errors.details?.certificates as any)?.message || "")}
      />
    </div>
  );
};
export default PPSProductDetailsInput;
