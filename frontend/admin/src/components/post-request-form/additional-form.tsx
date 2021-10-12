import React, { useEffect, useState } from "react";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import SelectInput from "@components/ui/storybook/select-input";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import { useCategoriesQuery } from "@graphql/category.graphql";
import BidParticipantFilterInput from "./bid-participant-filter-input";
import { ALLOWED_COMPANY_QUESTIONS } from "./additional-constants";

interface IAdditionalFormProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors: FieldErrors<PostRequestFormValue>;
}

const AdditionalForm: React.FC<IAdditionalFormProps> = ({
  register,
  control,
  errors,
}) => {
  const { t } = useTranslation("form");
  const { data, loading, error } = useCategoriesQuery();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "additional.allowedCompany",
  });
  const [pOptions, setPOptions] = useState(ALLOWED_COMPANY_QUESTIONS);

  // Append to fields on first run
  useEffect(() => {
    if (!fields.length) append({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    removeParticipantKeyDuplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const categories = data?.categories;

  if (error) console.log(error);

  function removeParticipantKeyDuplication() {
    const notDuplicated: any = [];
    // @TODO find better algorithm than this
    ALLOWED_COMPANY_QUESTIONS.forEach((acq) => {
      let isDuplicate = false;
      fields.forEach((f: any) => {
        // (f.key === acq)
        if (f?.key?.value === acq.value) isDuplicate = true;
      });

      if (!isDuplicate) notDuplicated.push(acq);
    });

    setPOptions(notDuplicated);
  }

  return (
    <>
      <h3 className="mt-7 mb-3">{t("additional-information-check-title")}</h3>
      <InputLabel
        numberQueue={"a"}
        queueBackground="blue"
        label={t("who-can-participate-to-bid")}
      />
      {fields
        .slice(0, ALLOWED_COMPANY_QUESTIONS.length)
        .map((field: any, idx) => {
          return (
            <BidParticipantFilterInput
              key={field?.id}
              field={field}
              idx={idx}
              control={control}
              pOptions={pOptions}
              remove={remove}
              append={append}
            />
          );
        })}

      <SelectInput
        getOptionLabel={(option) => option.label || option.name}
        getOptionValue={(option) => option.value || option.name}
        control={control}
        options={categories || []}
        queueBackground="blue"
        numberQueue="b"
        className="my-6"
        loading={loading}
        isMulti
        name="additional.categories"
        label={t("categories-label")}
        placeholder={t("categories-placeholder")}
      />
    </>
  );
};
export default AdditionalForm;
