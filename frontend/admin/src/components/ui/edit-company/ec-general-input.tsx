import CirclePlusIcon from "@assets/icons/circle-plus-icon";
import { businessTypes } from "@datas/businessTypes";
import { industriesData } from "@datas/industries";
import { ICompany } from "@graphql/types.graphql";
import { COLORS } from "@utils/colors";
import { vietnamCities } from "@utils/vietnam-cities";
import { useTranslation } from "next-i18next";
import React from "react";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";
import PhoneNumberInput from "../phone-number-input/phone-number-input";
import DocumentInput from "../storybook/document-input";
import DateInput from "../storybook/inputs/date-input";
import Input from "../storybook/inputs/input";
import NumberInput from "../storybook/inputs/number-input";
import TextArea from "../storybook/inputs/text-area";
import SelectInput from "../storybook/select-input";
import ECMainProductInput from "./ec-main-product-input";
import ECProfileImageInput from "./ec-profile-image-input";
import { ECFormValues } from "./ec-schema";

interface IECGeneralInputProps {
  register: UseFormRegister<ECFormValues>;
  control: Control<ECFormValues>;
  errors?: FieldErrors<ECFormValues>;
  trigger: UseFormTrigger<ECFormValues>;
  initValue?: ICompany;
}

const ECGeneralInput: React.FC<IECGeneralInputProps> = ({
  control,
  errors,
  trigger,
  initValue,
  register,
}) => {
  const { t } = useTranslation("form");
  return (
    <div className="space-y-4">
      <div className="relative pb-10">
        <DocumentInput
          inputStyle={{ height: "180px", borderColor: COLORS.GRAY[300] }}
          control={control}
          accept="image/*"
          inputFileType="image"
          name="general.coverImage"
          dropZonePlaceholder={(<CirclePlusIcon />) as any}
          hideUploadButton
          thumbOnInput
        />
        <ECProfileImageInput
          control={control}
          name="general.profileImage"
          className="absolute bottom-0 left-8"
        />
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-5">
        <Input
          {...register("general.name")}
          error={t(errors?.general?.name?.message || "")}
          disabled
          onChange={(e) => {
            register("general.name").onChange(e);
            trigger("general.name");
          }}
          label={t("companyName-input-label")}
          placeholder={t("companyName-input-placeholder")}
        />

        <PhoneNumberInput
          name="general.contactNumber"
          control={control}
          onChange={() => {
            trigger("general.contactNumber");
          }}
          label={t("phoneNumber-label")}
          variant="outline"
          placeholder={t("phoneNumber-placeholder")}
          error={t(errors?.general?.contactNumber?.message || "")}
        />

        <TextArea
          {...register("general.description")}
          error={t(errors?.general?.description?.message || "")}
          onChange={(e) => {
            register("general.description").onChange(e);
            trigger("general.description");
          }}
          label={t("description-input-label")}
          placeholder={t("description-input-placeholder")}
        />
        <div className="space-y-2">
          <NumberInput
            name="general.employeeAmount"
            onChange={() => {
              trigger("general.employeeAmount");
            }}
            label={t("employeeAmount-input-label")}
            placeholder={t("employeeAmount-input-placeholder")}
            control={control}
            error={t(errors?.general?.employeeAmount?.message || "")}
          />
          <DateInput
            name="general.establishmentDate"
            onChange={() => {
              trigger("general.establishmentDate");
            }}
            label={t("establishmentDate-input-label")}
            placeholder={t("establishmentDate-input-placeholder")}
            error={t(errors?.general?.establishmentDate?.message || "")}
            control={control}
          />
        </div>

        <SelectInput
          name="general.location"
          {...(initValue?.settings?.location
            ? {
                getInitialValue: (opt) =>
                  opt.name === initValue?.settings?.location,
              }
            : {})}
          label={t("location-input-label")}
          onChange={() => {
            trigger("general.location");
          }}
          placeholder={t("location-input-placeholder")}
          control={control}
          options={vietnamCities}
          getOptionLabel={(opt) => opt.name}
          error={t((errors?.general?.location as any)?.message || "")}
          getOptionValue={(opt) => opt.name}
        />

        <Input
          {...register("general.address")}
          error={t(errors?.general?.address?.message || "")}
          onChange={(e) => {
            register("general.address").onChange(e);
            trigger("general.address");
          }}
          label={t("companyAddress-input-label")}
          placeholder={t("companyAddress-input-placeholder")}
        />

        <SelectInput
          name="general.industry"
          {...(initValue?.industryId
            ? { getInitialValue: (opt) => opt.id === initValue?.industryId }
            : {})}
          label={t("industry-input-label")}
          onChange={() => {
            trigger("general.industry");
          }}
          placeholder={t("industry-input-placeholder")}
          control={control}
          options={industriesData}
          getOptionLabel={(opt) => t("industry:" + opt.label)}
          error={t((errors?.general?.industry as any)?.message || "")}
          getOptionValue={(opt) => opt.label}
        />

        <SelectInput
          name="general.businessType"
          {...(initValue?.businessTypeId
            ? { getInitialValue: (opt) => opt.id === initValue?.businessTypeId }
            : {})}
          onChange={() => {
            trigger("general.businessType");
          }}
          label={t("businessType-input-label")}
          placeholder={t("businessType-input-placeholder")}
          control={control}
          options={businessTypes}
          getOptionLabel={(opt) => opt.label}
          getOptionValue={(opt) => opt.label}
          error={t((errors?.general?.businessType as any)?.message || "")}
        />

        <ECMainProductInput
          onChange={() => {
            trigger("general.mainProducts");
          }}
          name="general.mainProducts"
          error={t((errors?.general?.mainProducts as any)?.message || "")}
          control={control}
        />
      </div>
    </div>
  );
};
export default ECGeneralInput;
