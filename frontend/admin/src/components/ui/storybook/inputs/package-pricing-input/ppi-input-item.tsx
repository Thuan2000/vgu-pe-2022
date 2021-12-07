import CheckmarkIcon from "@assets/icons/checkmark-icon";
import XIcon from "@assets/icons/x-icon";
import { COLORS } from "@utils/colors";
import { preventSubmitOnEnter } from "@utils/functions";
import { findIndex } from "lodash";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Datepicker } from "../date-input";
import Input from "../input";
import { NumInput } from "../number-input";
import PPIFileAttacher from "./ppi-file-attacher";
import { IPPIPackage, IPPIRow } from "./ppi-interfaces";
import PPIUnitInput from "./ppi-unit-input";

interface IPPIInput {
  pkg: IPPIPackage;
  onChange: (pkg: IPPIPackage, row: IPPIRow, value: any) => void;
  row: IPPIRow;
  value: any;
  isDisabled?: boolean;
}

function getPrValue(row: IPPIRow, pkg: IPPIPackage) {
  const idx = findIndex(pkg.packageRows, (pr) => row.id === pr.rowId);
  if (idx === -1) {
    if (row.inputType === "PRICE") return { price: "", unit: "" };
    if (row.inputType === "ATTACHMENT") return null;

    return "";
  }
  return pkg.packageRows?.at(idx)?.value;
}

export const PPIDateInput: React.FC<IPPIInput> = ({
  onChange,
  row,
  pkg,
  isDisabled,
}) => {
  const { t } = useTranslation("form");
  return (
    <Datepicker
      rootClassName="h-full w-full flex-center"
      className="w-full h-full !pl-4"
      placeholderText={t("ppi-date-input-placeholder")}
      wrapperClassName="h-full"
      value={getPrValue(row, pkg)}
      onChange={(e) => onChange(pkg, row, e)}
      disabled={isDisabled}
    />
  );
};

export const PPIPlainInput: React.FC<IPPIInput> = ({
  row,
  onChange,
  pkg,
  isDisabled,
}) => {
  const { t } = useTranslation("form");
  return (
    <Input
      noBorder
      placeholder={t("ppi-plain-input-placeholder")}
      className="w-full focus:ring-0"
      onChange={(e) => onChange(pkg, row, e.target.value)}
      value={getPrValue(row, pkg)}
      {...preventSubmitOnEnter()}
      disabled={isDisabled}
    />
  );
};

export const PPICheckboxInput: React.FC<IPPIInput> = ({
  row,
  isDisabled,
  onChange,
  pkg,
}) => {
  const isChecked = getPrValue(row, pkg) || false;
  return (
    <div
      className="w-full h-full flex flex-center cursor-pointer"
      {...(isDisabled ? {} : { onClick: () => onChange(pkg, row, !isChecked) })}
    >
      {isChecked && (
        <CheckmarkIcon fill={COLORS.GRAY[300]} className="w-6 h-6" />
      )}
      {!isChecked && <XIcon fill={COLORS.GRAY[300]} className="w-4 h-4" />}
    </div>
  );
};

export const PPIPriceInput: React.FC<IPPIInput> = ({
  row,
  onChange,
  pkg,
  isDisabled,
}) => {
  const { t } = useTranslation("form");
  const value = getPrValue(row, pkg);

  return (
    <div className="flex items-center w-full">
      <NumInput
        suffix={` ${t("budget-sign")}`}
        noBorder
        placeholder={t("ppi-price-input-placeholder")}
        inputClassName="!rounded-none !border-none"
        onChange={(e) => onChange(pkg, row, { ...value, price: e })}
        value={value?.price}
        {...preventSubmitOnEnter()}
        disabled={isDisabled}
      />
      <span className="mr-[-1px] z-0">{"/"}</span>
      <PPIUnitInput
        value={value?.unit}
        onChange={(v) => onChange(pkg, row, { ...value, unit: v })}
        disabled={isDisabled}
      />
    </div>
  );
};

export const PPIPriceRangeInput: React.FC<IPPIInput> = ({
  row,
  isDisabled,
  onChange,
  pkg,
}) => {
  const { t } = useTranslation("form");
  const value = getPrValue(row, pkg);

  return (
    <div className="flex items-center w-full">
      <NumInput
        suffix={` ${t("budget-sign")}`}
        noBorder
        inputClassName="!rounded-none !border-none"
        onChange={(e) => onChange(pkg, row, { ...value, minPrice: e })}
        value={value?.minPrice}
        {...preventSubmitOnEnter()}
        disabled={isDisabled}
      />
      <span className="mr-2">{"-"}</span>

      <NumInput
        suffix={` ${t("budget-sign")}`}
        noBorder
        placeholder={t("ppi-price-input-placeholder")}
        inputClassName="!rounded-none !border-none"
        onChange={(e) => onChange(pkg, row, { ...value, maxPrice: e })}
        value={value?.maxPrice}
        disabled={isDisabled}
      />
      <span className="mr-2">{"/"}</span>
      <PPIUnitInput
        value={value?.unit}
        onChange={(v) => onChange(pkg, row, { ...value, unit: v })}
        disabled={isDisabled}
      />
    </div>
  );
};

export const PPIAttachmentInput: React.FC<IPPIInput> = ({
  onChange,
  row,
  isDisabled,
  pkg,
}) => {
  const value = getPrValue(row, pkg);

  return (
    <div className="flex items-center w-full">
      <PPIFileAttacher
        disabled={isDisabled}
        value={value}
        onChange={(e) => onChange(pkg, row, e)}
      />
    </div>
  );
};
