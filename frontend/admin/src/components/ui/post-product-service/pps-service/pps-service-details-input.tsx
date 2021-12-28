import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  UseFormRegister,
  FieldErrors,
  Control,
  UseFormTrigger,
} from "react-hook-form";

import CreateableSelectInput from "@components/ui/storybook/createable-select/createable-select-input";
import { IPostServiceFormValues } from "./pps-service-interface";
import SelectInput from "@components/ui/storybook/select-input";
import { vietnamProvinces } from "@utils/vietnam-cities";
import FaqInput from "@components/ui/storybook/inputs/faq-input/faq-input";
import { generateUUID } from "@utils/functions";
import { useTagsQuery } from "@graphql/tag.graphql";
import { useRouter } from "next/dist/client/router";
import { ILocale, ITagInput } from "@graphql/types.graphql";
import TextArea from "@components/ui/storybook/inputs/text-area";
import { ITagWithNewRecord } from "@utils/interfaces";

interface IPPSServiceDetailsInputProps {
  register: UseFormRegister<IPostServiceFormValues>;
  errors: FieldErrors<IPostServiceFormValues>;
  control: Control<IPostServiceFormValues>;
  trigger: UseFormTrigger<IPostServiceFormValues>;
}

const PPSServiceDetailsInput: React.FC<IPPSServiceDetailsInputProps> = ({
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
        label={t("postService-description-input-label")}
        error={t(errors.details?.description?.message || "")}
      />

      <SelectInput
        label={t("post-service-location-input-label")}
        placeholder={t("post-service-location-input-placeholder")}
        numberQueue={5}
        options={vietnamProvinces}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.id}
        control={control}
        onChange={(_) => trigger("details.location")}
        name="details.location"
        required
        error={t((errors?.details?.location as any)?.message)}
      />

      <CreateableSelectInput
        label={t("post-service-tags-input-label")}
        placeholder={t("post-service-tags-input-placeholder")}
        isMulti
        numberQueue={6}
        control={control}
        onChange={(_) => trigger("details.tags")}
        name="details.tags"
        getOptionLabel={(o) => o.label || o.name}
        getOptionValue={(o) => o.label || o.name}
        options={tags}
        createNewOption={createNewTag}
        error={t((errors?.details?.tags as any)?.message)}
      />

      <FaqInput
        control={control}
        name="details.faqs"
        numberQueue={7}
        label={t("post-service-faq-input-label")}
      />
    </div>
  );
};
export default PPSServiceDetailsInput;
