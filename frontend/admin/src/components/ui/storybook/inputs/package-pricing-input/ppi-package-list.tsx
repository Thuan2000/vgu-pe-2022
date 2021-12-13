import { PlusIcon } from "@assets/icons/plus-icon";
import { COLORS } from "@utils/colors";
import { generateUUID } from "@utils/functions";
import { findIndex } from "lodash";
import { useTranslation } from "next-i18next";
import React from "react";
import PPIEmptyPr from "./ppi-empty-pr";
import { IPPIPackage, IPPIRow } from "./ppi-interfaces";
import { IPPIValue } from "./ppi-package-manager";
import PPIPackageItem from "./ppi-package-item";
import PPITableItemWrapper from "./ppi-table-item-wrapper";

interface IPPIPackageListProps {
  packages: IPPIPackage[];
  rows: IPPIRow[];
  onCreatedPackage?: (p: IPPIPackage) => void;
  onChange?: (value: IPPIPackage[]) => void;
  onDelete: (packages: IPPIPackage[]) => void;
  value: IPPIValue;
  packagePriceRow: IPPIRow;
}

const PPIPackageList: React.FC<IPPIPackageListProps> = ({
  packages,
  onCreatedPackage,
  onChange,
  onDelete,
  rows,
  value,
  packagePriceRow,
}) => {
  const { t } = useTranslation("form");

  function handlePkgChange(pkg: IPPIPackage) {
    const idx = findIndex(packages, (p) => p.id === pkg.id);

    if (!packages.length || idx === -1) packages.push(pkg);
    else packages[idx] = pkg;

    if (onChange) onChange(packages);
  }

  function createPackage() {
    const newPackage = {
      id: generateUUID(),
    };
    if (onCreatedPackage) onCreatedPackage(newPackage);
  }

  function handleDeletePackage(pkgId: string) {
    const idx = findIndex(packages, (p) => p.id === pkgId);

    packages.splice(idx, 1);

    onDelete(packages);
  }

  function getValuedPkg(pkg: IPPIPackage) {
    if (!value) return;

    const idx = findIndex(packages, (vp) => vp.id === pkg.id);
    if (idx === -1) return;

    return packages[idx];
  }

  return (
    <div className="w-full flex overflow-x-auto">
      {packages?.map((pkg, idx) => {
        return (
          <PPIPackageItem
            key={pkg.id + "package-list"}
            onChange={handlePkgChange}
            pkg={pkg}
            idx={idx}
            onDelete={handleDeletePackage}
            isDisabled={!onCreatedPackage && !onChange}
            wFull={!onCreatedPackage && !onChange && packages.length === 1}
            onePackageOnly={packages.length === 1}
            value={getValuedPkg(pkg)}
            rows={rows}
            packagePriceRow={packagePriceRow}
          />
        );
      })}

      {/* ADD Package button */}
      {!!onCreatedPackage && (
        <div
          className={`${
            packages.length === 1 ? "w-1/2" : "w-1/2"
          } flex-shrink-0`}
        >
          <PPITableItemWrapper
            isHead
            onClick={createPackage}
            className=" !bg-secondary-1 !bg-opacity-30 cursor-pointer"
          >
            <PlusIcon fill={COLORS.BOLDER} className="mr-2" />
            {t("input-package-pricing-addPackage-label")}
          </PPITableItemWrapper>
          {rows.map((row) => (
            <PPIEmptyPr key={row.id + "pakcage-empty-row"} />
          ))}
          <PPIEmptyPr />
        </div>
      )}
    </div>
  );
};
export default PPIPackageList;
