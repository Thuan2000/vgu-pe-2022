import { IFile } from "@graphql/types.graphql";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { IVietnamCity, vietnamCities } from "@utils/vietnam-cities";
import React, { useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../storybook/button";
import DocumentInput from "../../storybook/document-input";
import Input from "../../storybook/inputs/input";
import SelectInput from "../../storybook/select-input";
import Typography from "../../storybook/typography";
import * as yup from "yup";
import { generateUUID } from "@utils/functions";
import { IRawBFW } from "./bfw-constants";
import Checkbox from "@components/ui/storybook/checkbox";

type Key = "name" | "location" | "address" | "gallery" | "isForSiblingToo";

type FormValues = {
  name: string;
  // country: string;
  location: IVietnamCity;
  address: string;
  gallery: IFile[];
  isForSiblingToo?: boolean;
};

const schema = yup.object({
  name: yup.string().required("ec-create-bfw-nameRequired-error-message"),
  location: yup
    .object()
    .required("ec-create-bfw-locationRequired-error-message"),
  address: yup.string().required("ec-create-bfw-addressRequired-error-message"),
  gallery: yup
    .array()
    .min(1, "needAtLeast1Image-error")
    .required("needAtLeast1Image-error"),
});

interface IAddBFWFormProps {
  onCreated: (b: IRawBFW) => void;
  onCancel: () => void;
  initValue?: IRawBFW;
  siblingCheckboxLabel?: string;
  formTitle: string;
}

const AddBFWForm: React.FC<IAddBFWFormProps> = ({
  onCreated,
  onCancel,
  formTitle,
  initValue,
  siblingCheckboxLabel,
}) => {
  const { t } = useTranslation("form");
  const keys: Key[] = [
    "name",
    "location",
    "address",
    "gallery",
    "isForSiblingToo",
  ];
  const {
    trigger,
    control,
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  function triggerAll() {
    keys.forEach((k) => trigger(k));
  }

  function getAllValues() {
    const d: any = {
      id: generateUUID(),
    };

    keys.forEach((k) => (d[k] = getValues(k)));

    return d;
  }

  async function handleSubmit() {
    triggerAll();
    if (!isValid) return;

    const values = getAllValues();
    onCreated(values);
  }

  return (
    <div className="bg-white my-8 p-4 space-y-5 rounded-md sm:w-[550px]">
      <Typography text={formTitle} variant="title" align="center" />

      <div className="space-y-1">
        <Input
          required
          {...register("name")}
          onChange={(e) => {
            register("name").onChange(e);
            trigger("name");
          }}
          label={t("addBFW-name-input-label")}
          placeholder={t("addBFW-name-input-placeholder")}
          error={errors.name?.message}
          {...(!!initValue ? { value: initValue.name } : {})}
        />

        {siblingCheckboxLabel && (
          <Checkbox
            {...register("isForSiblingToo")}
            label={siblingCheckboxLabel}
          />
        )}
      </div>

      {/* <div className="grid grid-cols-2 gap-x-5 w-[570px]"> </div>*/}
      {/* <SelectInput
          required
          label={t("addBFW-name-input-label")}
          placeholder={t("addBFW-name-input-placeholder")}
          options={[{ name: "Vietnam" }]}
          getOptionLabel={(opt) => opt.name}
          getOptionValue={(opt) => opt.name}
          control={control}
          name="country"
        /> */}
      <SelectInput
        required
        label={t("addBFW-location-input-label")}
        placeholder={t("addBFW-location-input-placeholder")}
        options={vietnamCities}
        onChange={() => {
          trigger("location");
        }}
        noOptionsMessage={() => t("pleaseSelect-country-message")}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt.name}
        control={control}
        name="location"
        error={(errors.location as any)?.message}
        {...(!!initValue ? { value: initValue.location } : {})}
      />

      <Input
        required
        {...register("address")}
        onChange={(e) => {
          register("address").onChange(e);
          trigger("address");
        }}
        label={t("addBFW-address-label")}
        placeholder={t("addBFW-address-placeholder")}
        error={errors.address?.message}
        {...(!!initValue ? { value: initValue.address } : {})}
      />

      <DocumentInput
        multiple
        hideUploadButton
        maxFiles={4}
        onChange={() => trigger("gallery")}
        control={control}
        name="gallery"
        accept="image/*"
        inputFileType="image"
        error={(errors.gallery as any)?.message}
      />

      <div className="justify-end fic space-x-2">
        <Button onClick={onCancel} className={`w-36`} variant="cancel">
          {t("cancel-button-label")}
        </Button>
        <Button onClick={handleSubmit} className={`w-36`}>
          {t("add-button-label")}
        </Button>
      </div>
    </div>
  );
};

export default AddBFWForm;
