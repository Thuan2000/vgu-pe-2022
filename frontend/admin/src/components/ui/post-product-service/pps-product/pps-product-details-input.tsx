import LocationInput from "@components/ui/location-input/location-input";
import CreateableSelectInput from "@components/ui/storybook/createable-select/createable-select-input";
import Input from "@components/ui/storybook/inputs/input";
import SwitchInput from "@components/ui/storybook/inputs/switch-input";
import { useTagsQuery } from "@graphql/tag.graphql";
import { ILocale } from "@graphql/types.graphql";
import { generateUUID } from "@utils/functions";
import { ITagWithNewRecord } from "@utils/interfaces";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import locale from "yup/lib/locale";
import DimensionInput from "./dimension-input";
import { PPS_PRODUCT_DETAILS_FORM_INDEX } from "./pps-product-constants";
import {
  IPostProductFormValues,
  IProductStatus,
} from "./pps-product-interface";
import TagsInput from "./tags-input";

interface IPPSProductDetailsInputProps {}

const PPSProductDetailsInput: React.FC<IPPSProductDetailsInputProps> = ({}) => {
  const { t } = useTranslation("form");
  const {
    register,
    trigger,
    formState: { errors },
    control,
  } = useFormContext<IPostProductFormValues>();

  const [statuses, setStatuses] = useState<IProductStatus[]>([]);

  function createStatus(name: string) {
    const newStatus: IProductStatus = {
      id: generateUUID(),
      value: name,
    };

    return newStatus;
  }

  return (
    <div className="space-y-3">
      <Input
        {...register("details.brandName")}
        required
        onChange={(e) => {
          register("details.brandName").onChange(e);
          trigger("details.brandName");
        }}
        numberQueue={1}
        label={t("brandName-input-label")}
        placeholder={t("brandName-input-placeholder")}
        error={t(errors.details?.brandName?.message || "")}
      />

      <TagsInput
        label={t("post-product-tags-input-label")}
        placeholder={t("post-product-tags-input-placeholder")}
        numberQueue={2}
        inputFormPosition={PPS_PRODUCT_DETAILS_FORM_INDEX}
        name="details.tags"
      />

      <LocationInput
        label={t("location-input-label")}
        numberQueue={3}
        required
        control={control}
        error={t((errors.details?.location as any)?.message || "")}
        name="details.location"
        onChange={() => {
          trigger("details.location");
        }}
      />

      <CreateableSelectInput
        label={t("post-product-status-input-label")}
        placeholder={t("post-product-status-input-placeholder")}
        numberQueue={3}
        control={control}
        onChange={(_) => trigger("details.status")}
        name="details.status"
        getOptionLabel={(o) => o?.label || o?.value}
        getOptionValue={(o) => o?.label || o?.value}
        options={statuses}
        createNewOption={createStatus}
        error={t((errors?.details?.status as any)?.message)}
      />

      <SwitchInput
        labelProps={{
          label: t("post-product-isCustom-input-label"),
          numberQueue: 4,
        }}
        control={control}
        name="details.isCustom"
      />

      <SwitchInput
        labelProps={{
          label: t("post-product-isPreorder-input-label"),
          numberQueue: 5,
        }}
        control={control}
        name="details.isPreorder"
      />

      <DimensionInput
        control={control}
        name="details.baseDimension"
        labelProps={{
          label: t("post-product-baseDimension-input-label"),
          numberQueue: 6,
        }}
      />

      <DimensionInput
        control={control}
        name="details.packagedDimension"
        labelProps={{
          label: t("post-product-packagedDimension-input-label"),
          numberQueue: 7,
        }}
      />
    </div>
  );
};
export default PPSProductDetailsInput;
