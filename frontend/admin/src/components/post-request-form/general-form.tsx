import React from "react";
import Input from "@components/ui/storybook/inputs/input";
import {
  Control,
  FieldErrors,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import { IVietnamCity, vietnamCities } from "@utils/vietnam-cities";
import SelectInput from "@components/ui/storybook/select-input";
import TextArea from "@components/ui/storybook/inputs/text-area";

interface IGeneralInputProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  errors?: FieldErrors<PostRequestFormValue>;
}

const GeneralForm: React.FC<IGeneralInputProps> = ({
  register,
  control,
  errors,
}) => {
  const { t } = useTranslation("form");

  return (
    <>
      <Input
        noPrefix
        numberQueue={1}
        {...register("general.name")}
        className="my-6 w-full"
        label={`${t("post-request-name-label")}*`}
        note={t("post-request-name-desc")}
        placeholder="post-request-name-placeholder"
        error={errors?.general?.name?.message}
      />
      <Input
        noPrefix
        numberQueue={2}
        {...register("general.endDate")}
        className="my-6 w-full"
        label={`${t("post-request-endDate-label")}*`}
        placeholder={t("post-request-endDate-placeholder")}
        error={errors?.general?.endDate?.message}
      />
      <SelectInput
        name="general.location"
        numberQueue={3}
        label={`${t("post-request-location-label")}*`}
        placeholder={t("post-request-location-placeholder")}
        control={control}
        options={vietnamCities}
        error={(errors?.general?.location as any)?.message}
        getOptionLabel={(option: IVietnamCity) => option.name}
        getOptionValue={(option: IVietnamCity) => option.name}
      />
      <TextArea
        label={t("post-request-description-label")}
        className="my-6 w-full"
        numberQueue={4}
        placeholder={t("post-request-description-placeholder")}
        error={errors?.general?.description?.message}
        {...register("general.description")}
      />
    </>
  );
};
export default GeneralForm;
