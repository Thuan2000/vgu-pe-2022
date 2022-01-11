/**
 * THis component should used inside formProvider of react hook form
 * And use input form position because that's how we design it
 */

import { useQuery } from "@apollo/client";
import CreateableSelectInput from "@components/ui/storybook/createable-select/createable-select-input";
import { useTagsQuery } from "@graphql/tag.graphql";
import { ILocale } from "@graphql/types.graphql";
import { ITagWithNewRecord } from "@utils/interfaces";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { Control, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ITagsInputProps {
  name: string;
  inputFormPosition: number;
  label: string;
  placeholder: string;
  numberQueue: number;
}

const TagsInput: React.FC<ITagsInputProps> = ({
  name,
  inputFormPosition,
  label,
  placeholder,
  numberQueue,
}) => {
  const { t } = useTranslation();
  const { query, locale } = useRouter();
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  const firstRun = useRef(true);
  const { data, refetch } = useTagsQuery({
    variables: { locale: locale as any },
  });
  const [tags, setTags] = useState(data?.tags || []);

  useEffect(() => {
    if (firstRun.current) firstRun.current = false;
    else setTags(data?.tags || []);
  }, [data?.tags]);

  useEffect(() => {
    async function handleRefetch() {
      if (parseInt(query.formPosition + "") !== inputFormPosition) return;
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }

      const { data } = (await refetch(locale as any)) || {};
      setTags(data?.tags);
    }

    handleRefetch();
  }, [query.formPosition]);

  function createNewTag(name: string) {
    const newTag: ITagWithNewRecord = {
      name: name as any,
      locale: locale as ILocale,
      isNewRecord: true,
    };

    return newTag;
  }

  return (
    <CreateableSelectInput
      label={label}
      placeholder={placeholder}
      numberQueue={numberQueue}
      isMulti
      error={t((errors.details?.tags as any)?.message || "")}
      control={control}
      onChange={(_) => trigger(name)}
      name={name}
      getOptionLabel={(o) => o?.label || o?.name}
      getOptionValue={(o) => o?.label || o?.name}
      options={tags as any}
      createNewOption={createNewTag}
    />
  );
};
export default TagsInput;
