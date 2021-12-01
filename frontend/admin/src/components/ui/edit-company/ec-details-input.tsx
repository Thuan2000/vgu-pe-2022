import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormTrigger,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { IRawBFW } from "./ec-add-branch/bfw-constants";
import BFWInput from "./ec-add-branch/bfw-input";
import { ECFormValues } from "./ec-schema";

interface IECDetailsInputProps extends React.HTMLAttributes<HTMLDivElement> {
  register: UseFormRegister<ECFormValues>;
  control: Control<ECFormValues>;
  errors?: FieldErrors<ECFormValues>;
  trigger: UseFormTrigger<ECFormValues>;
  getValues: UseFormGetValues<ECFormValues>;
  setValue: UseFormSetValue<ECFormValues>;
}

const ECDetailsInput: React.FC<IECDetailsInputProps> = ({
  control,
  getValues,
  setValue,
}) => {
  const { t } = useTranslation("form");

  function addWarehouseFromFactory(f: IRawBFW) {
    const currentWarehouses = getValues("details.warehouses") || [];
    setValue("details.warehouses", [...currentWarehouses, f]);
  }
  function addFactoryFromWarehouse(f: IRawBFW) {
    const currentFactories = getValues("details.factories") || [];
    setValue("details.factories", [...currentFactories, f]);
  }

  return (
    <div className="space-y-5">
      <BFWInput
        formTitle={t("addBranch-form-title")}
        control={control}
        label={t("ec-addBranch-label")}
        buttonLabel={t("ec-addBranch-button-label")}
        name="details.branches"
      />
      <BFWInput
        formTitle={t("addFactory-form-title")}
        control={control}
        siblingCheckboxLabel={t("addBfw-setAsWarehouse-label")}
        handleAddedSibling={addWarehouseFromFactory}
        label={t("ec-addFactory-label")}
        buttonLabel={t("ec-addFactory-button-label")}
        name="details.factories"
      />
      <BFWInput
        formTitle={t("addWarehouse-form-title")}
        control={control}
        siblingCheckboxLabel={t("addBfw-setAsFactory-label")}
        handleAddedSibling={addFactoryFromWarehouse}
        label={t("ec-addWarehouse-label")}
        buttonLabel={t("ec-addWarehouse-button-label")}
        name="details.warehouses"
      />
    </div>
  );
};
export default ECDetailsInput;
