import React from "react";
import Input from "@components/ui/storybook/inputs/input";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PostRequestFormValue } from "./post-request-schema";
import { IVietnamCity, vietnamCities } from "@utils/vietnam-cities";
import SelectInput from "@components/ui/storybook/select-input";
import TextArea from "@components/ui/storybook/inputs/text-area";
import DateInput from "@components/ui/storybook/inputs/date-input";

import { registerLocale, setDefaultLocale } from "react-datepicker";

// Locale setting
import vi from "date-fns/locale/vi";
import { IBuyingRequest, ISingleBuyingRequest } from "@graphql/types.graphql";
registerLocale("vi", vi);
setDefaultLocale("vi");

interface IGeneralInputProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  initValue?: ISingleBuyingRequest;
  errors?: FieldErrors<PostRequestFormValue>;
  trigger: UseFormTrigger<PostRequestFormValue>;
}

const GeneralForm: React.FC<IGeneralInputProps> = ({
  register,
  trigger,
  control,
  initValue,
  errors,
}) => {
  const { t } = useTranslation("form");

  return (
    <div className="md:w-2/3">
      <Input
        numberQueue={1}
        {...register("general.name")}
        className="my-6 w-full"
        autoFocus
        label={`${t("post-request-name-label")}*`}
        note={t("post-request-name-desc")}
        onChange={(e) => {
          register("general.name").onChange(e);
          trigger("general.name");
        }}
        placeholder={t("post-request-name-placeholder")}
        error={errors?.general?.name?.message}
      />
      <DateInput
        control={control}
        name="general.endDate"
        className="my-6 w-full"
        locale="vi"
        minDate={new Date()}
        placeholder={t("post-request-endDate-placeholder")}
        error={errors?.general?.endDate?.message}
        label={`${t("post-request-endDate-label")}*`}
        numberQueue={2}
      />

      <SelectInput
        name="general.location"
        numberQueue={3}
        label={`${t("post-request-location-label")}*`}
        placeholder={t("post-request-location-placeholder")}
        control={control}
        options={vietnamCities}
        onChange={(_) => {
          trigger("general.location");
        }}
        getInitialValue={(option?: IVietnamCity) =>
          option?.name === (initValue?.location as string)
        }
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
    </div>
  );
};
export default GeneralForm;
