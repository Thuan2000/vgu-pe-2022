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
import BidParticipantFilterInput from "./bid-participant-filter-input";
import { ALLOWED_COMPANY_QUESTIONS } from "./additional-constants";
import NumberInput from "@components/ui/storybook/inputs/number-input";

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

  const [pOptions, setPOptions] = useState(ALLOWED_COMPANY_QUESTIONS);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additional.allowedCompany",
  });

  useEffect(() => {
    if (!fields.length) append({} as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    removeParticipantKeyDuplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  function removeParticipantKeyDuplication() {
    const notDuplicated: any = [];
    // @TODO find better algorithm than this
    ALLOWED_COMPANY_QUESTIONS.forEach((acq) => {
      let isDuplicate = false;
      fields?.forEach((f: any) => {
        // (f.key === acq)
        if ((typeof f?.key === "string" ? f?.key : f?.key?.value) === acq.value)
          isDuplicate = true;
      });

      if (!isDuplicate) notDuplicated.push(acq);
    });

    setPOptions(notDuplicated);
  }

  return (
    <>
      <h3 className="mt-7 mb-3">{t("additional-information-check-title")}</h3>

      <NumberInput
        label={t("post-request-biddersLimit-label")}
        className="my-6"
        numberQueue="a"
        queueBackground="secondary-1"
        suffix={` ${t("bidders-text")}`}
        placeholder={t("post-request-biddersLimit-placeholder")}
        name="additional.biddersLimit"
        control={control}
        allowNegative={false}
        error={errors?.additional?.biddersLimit?.message}
      />
      <InputLabel
        numberQueue="b"
        queueBackground="blue"
        label={t("who-can-participate-to-bid")}
      />
      {fields
        ?.slice(0, ALLOWED_COMPANY_QUESTIONS.length)
        ?.map((field: any, idx) => {
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
    </>
  );
};
export default AdditionalForm;
