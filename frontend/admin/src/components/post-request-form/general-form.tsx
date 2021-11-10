import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  UseFormGetValues,
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
import { IBuyingRequest } from "@graphql/types.graphql";
import Input from "@components/ui/storybook/inputs/input";
registerLocale("vi", vi);
setDefaultLocale("vi");

interface IGeneralInputProps {
  register: UseFormRegister<PostRequestFormValue>;
  control: Control<PostRequestFormValue>;
  initValue?: IBuyingRequest;
  errors?: FieldErrors<PostRequestFormValue>;
  trigger: UseFormTrigger<PostRequestFormValue>;
  getValues: UseFormGetValues<PostRequestFormValue>;
}

const GeneralForm: React.FC<IGeneralInputProps> = ({
  register,
  trigger,
  control,
  getValues,
  initValue,
  errors,
}) => {
  const { t } = useTranslation("form");

  return (
    <div className="md:w-2/3">
      <Input
        numberQueue={1}
        value={getValues("general.name")}
        prefix={`${t("requestNamePrefix-value")} - `}
        style={{
          paddingLeft: `${
            Math.min(t("requestNamePrefix-value").length) * 12.5
          }px`,
        }}
        {...register("general.name")}
        onChange={(e) => {
          register("general.name").onChange(e);
          trigger("general.name");
        }}
        className="my-6 w-full"
        autoFocus
        label={`${t("post-request-name-label")}`}
        required
        note={t("post-request-name-desc")}
        placeholder={t("post-request-name-placeholder")}
        error={t(errors?.general?.name?.message || "")}
      />
      <DateInput
        control={control}
        name="general.endDate"
        className="my-6 w-full"
        locale="vi"
        required
        minDate={new Date()}
        placeholder={t("post-request-endDate-placeholder")}
        error={t(errors?.general?.endDate?.message || "")}
        label={`${t("post-request-endDate-label")}`}
        numberQueue={2}
      />

      <SelectInput
        name="general.location"
        numberQueue={3}
        required={true}
        label={`${t("post-request-location-label")}`}
        placeholder={t("post-request-location-placeholder")}
        control={control}
        options={vietnamCities}
        onChange={(_) => {
          trigger("general.location");
        }}
        getInitialValue={(option?: IVietnamCity) =>
          option?.name === (initValue?.location as string)
        }
        error={t((errors?.general?.location as any)?.message || "")}
        getOptionLabel={(option: IVietnamCity) => option.name}
        getOptionValue={(option: IVietnamCity) => option.name}
      />
      <TextArea
        label={t("post-request-description-label")}
        className="my-6 w-full"
        numberQueue={4}
        placeholder={t("post-request-description-placeholder")}
        error={t(errors?.general?.description?.message || "")}
        {...register("general.description")}
      />
    </div>
  );
};
export default GeneralForm;
