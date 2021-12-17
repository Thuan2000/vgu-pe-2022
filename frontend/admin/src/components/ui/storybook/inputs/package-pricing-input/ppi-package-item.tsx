import { generateUUID } from "@utils/functions";
import { findIndex } from "lodash";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import PPIAddUpdateRowMenu from "./ppi-add-row/ppi-add-update-row-menu";
import PPIEmptyPr from "./ppi-empty-pr";
import {
  PPIAttachmentInput,
  PPICheckboxInput,
  PPIDateInput,
  PPIPlainInput,
  PPIPriceInput,
} from "./ppi-input-item";
import { IPPIRow, IPPIPackage } from "./ppi-interfaces";
import {
  PPI_PACKAGE_PRICE_ID,
  PPI_PACKAGE_PRICE_NAME,
} from "./ppi-package-manager";
import PPITableItemWrapper from "./ppi-table-item-wrapper";
import PPIUpdatePackage from "./ppi-update-package";

interface IPPIPackageItemProps {
  rows: IPPIRow[];
  pkg: IPPIPackage;
  onePackageOnly?: boolean;
  onChange: (pkg: IPPIPackage) => void;
  onDelete: (pkgId: string) => void;
  value?: IPPIPackage;
  idx: number;
  isDisabled?: boolean;
  wFull?: boolean;
  packagePriceRow: IPPIRow;
}

const PPIPackageItem: React.FC<IPPIPackageItemProps> = ({
  rows,
  idx,
  pkg,
  onePackageOnly,
  value,
  onChange,
  onDelete,
  isDisabled,
  wFull,
  packagePriceRow,
}) => {
  const { t } = useTranslation("form");
  const [isUpdatingPackageHead, setIsUpdatingPackageHead] = useState(false);
  const ref = useOutsideClickRef(() => setIsUpdatingPackageHead(false));

  function handleChange(pkg: IPPIPackage, row: IPPIRow, value: any) {
    const newPr = {
      rowId: row.id,
      value,
    };
    if (!pkg.packageRows) {
      pkg.packageRows = [newPr];
    } else {
      const prIndex = findIndex(pkg.packageRows, (pr) => pr.rowId === row.id);
      if (prIndex === -1) pkg.packageRows.push(newPr);
      else pkg.packageRows[prIndex] = newPr;
    }

    onChange(pkg);
  }

  function getRowValue(row: IPPIRow) {
    if (!value?.packageRows) return;
    const idx = findIndex(value?.packageRows, (pr) => row?.id === pr?.rowId);
    if (idx === -1) return "";
    return value?.packageRows[idx]?.value;
  }

  function getInput(row: IPPIRow) {
    const { inputType } = row || {};

    const value = getRowValue(row);

    const param = {
      value,
      row,
      pkg,
      isDisabled,
      onChange: handleChange,
    };
    switch (inputType) {
      case "PLAIN":
        return <PPIPlainInput {...param} />;
      case "DATE":
        return <PPIDateInput {...param} />;
      case "CHECKBOX":
        return <PPICheckboxInput {...param} />;
      case "PRICE":
        return <PPIPriceInput {...param} />;
      // case "PRICE_RANGE":
      //   return <PPIPriceRangeInput {...param} />;
      case "ATTACHMENT":
        return <PPIAttachmentInput {...param} />;
    }
  }

  function handleDeletePackage() {
    onDelete(pkg.id);
  }

  return (
    <div
      className={`flex-shrink-0 select-none
      ${onePackageOnly ? "w-1/2" : "w-1/2"} 
      ${wFull && "!w-full"}
    `}
    >
      {/* <CreateableSelect options={[]} /> */}
      <PPITableItemWrapper
        className="relative cursor-pointer"
        {...(isDisabled
          ? {}
          : {
              onClick: () => setIsUpdatingPackageHead((old) => !old),
            })}
        isHead
      >
        {`${t("package-text")} ` + (idx + 1)}

        {!onePackageOnly && isUpdatingPackageHead && (
          <div ref={ref}>
            <PPIUpdatePackage onDelete={handleDeletePackage} />
          </div>
        )}
      </PPITableItemWrapper>
      {rows?.map((row, idx) => {
        if (row.id === PPI_PACKAGE_PRICE_ID) return;
        return (
          <PPITableItemWrapper
            key={"ppi-package-item" + row.id + pkg.id}
            className="border-b overflow-hidden"
          >
            {getInput(row)}
          </PPITableItemWrapper>
        );
      })}
      {!isDisabled && <PPIEmptyPr />}

      <PPITableItemWrapper
        key={"ppi-package-item" + "packageprice" + pkg.id}
        className="border-b overflow-hidden"
      >
        {getInput(packagePriceRow)}
      </PPITableItemWrapper>
    </div>
  );
};
export default PPIPackageItem;
