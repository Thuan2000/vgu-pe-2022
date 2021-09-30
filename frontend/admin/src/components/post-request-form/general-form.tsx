import React from "react";
import Input from "@components/ui/storybook/inputs/input";
import {
  Control,
  FieldErrors,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from ".";
import { IVietnamCity, vietnamCities } from "@utils/vietnam-cities";
import CityInput from "@components/city-input";
import TextArea from "@components/ui/storybook/inputs/text-area";
import { useRouter } from "next/dist/client/router";

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
        {...register("name")}
        className="my-6 w-full"
        label={t("post-request-name-label")}
        note={t("post-request-name-desc")}
        placeholder="post-request-name-placeholder"
        error={errors?.name?.message}
      />
      <Input
        noPrefix
        numberQueue={2}
        {...register("endDate")}
        className="my-6 w-full"
        label={t("post-request-endDate-label")}
        placeholder={t("post-request-endDate-placeholder")}
        error={errors?.endDate?.message}
      />
      <CityInput
        name="location"
        numberQueue={3}
        label={t("post-request-location-label")}
        placeholder={t("post-request-location-placeholder")}
        control={control}
        options={vietnamCities}
        error={errors?.location?.message}
        getOptionLabel={(option: IVietnamCity) => option.name}
        getOptionValue={(option: IVietnamCity) => option.name}
      />
      <TextArea
        label={t("post-request-description-label")}
        className="my-6 w-full"
        numberQueue={4}
        placeholder={t("post-request-description-placeholder")}
        error={errors?.description?.message}
        {...register("description")}
      />
      {/* <Input
        noPrefix
        numberQueue={5}
        {...register("status")}
        className="my-6 w-full"
        label={t("post-request-status-label")}
        placeholder={t("post-request-status-placeholder")}
        error={errors?.status?.message}
      /> */}
    </>
  );
};
export default GeneralForm;
