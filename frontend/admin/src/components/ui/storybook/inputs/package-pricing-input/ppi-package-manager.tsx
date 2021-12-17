import React, { useEffect, useRef, useState } from "react";
import PPIRowList from "./ppi-row-list";
import { IPPIPackage, IPPIRow } from "./ppi-interfaces";
import PPIPackageList from "./ppi-package-list";
import { findIndex } from "lodash";
import { generateUUID } from "@utils/functions";
import Button from "../../button";
import { useTranslation } from "react-i18next";

export interface IPPIValue {
  packages: IPPIPackage[];
  rows: IPPIRow[];
}

export interface IPPIPackageManagerProps {
  onChange: (value: IPPIValue) => void;
  value: IPPIValue;
  onAbort: () => void;
}

export const PPI_PACKAGE_PRICE_NAME = "PACKAGE_PRICE_LABEL";
export const PPI_PACKAGE_PRICE_ID = "package-price-label-row-id-52vdsavsd94vd";

export const packagePriceRow: IPPIRow = {
  id: PPI_PACKAGE_PRICE_ID,
  inputType: "PRICE",
  name: PPI_PACKAGE_PRICE_NAME,
  description: "PACKAGE_PRICE_DESCRIPTION",
};

const PPIPackageManager: React.FC<IPPIPackageManagerProps> = ({
  onChange,
  value,
  onAbort,
}) => {
  const { t } = useTranslation("form");
  const [rows, setRows] = useState<IPPIRow[]>(
    !!value?.rows?.length ? [...value?.rows] : [packagePriceRow]
  );
  const [packages, setPackages] = useState<IPPIPackage[]>(
    value?.packages || [{ id: generateUUID() }]
  );
  function handleCreatedRow(r: IPPIRow) {
    setRows([...rows, r]);
  }

  function resetPrsValue(rowId: string) {
    packages.map((pkg) => {
      if (!pkg?.packageRows?.length) return pkg;

      pkg.packageRows = pkg?.packageRows.map((pr) => {
        if (pr.rowId === rowId) pr.value = undefined;
        return pr;
      });

      return pkg;
    });
  }

  function removePr(rowId: string) {
    packages.map((pkg) => {
      if (!pkg?.packageRows?.length) return pkg;

      pkg.packageRows = pkg.packageRows.filter((pr) => pr.rowId !== rowId);
      return pkg;
    });
  }

  function handleUpdateRow(newRow: IPPIRow) {
    const idx = findIndex(rows, (r) => r.id === newRow.id);

    // Reset value if type is changed
    if (newRow.inputType !== rows[idx].inputType) resetPrsValue(newRow.id);

    rows[idx] = newRow;
    onChange({ rows, packages });
  }

  function handleCreatedPackage(p: IPPIPackage) {
    setPackages([...packages, p]);
  }

  function handlePackageChange(packages: IPPIPackage[]) {
    onChange({ rows, packages });
  }

  function handleDeleteRow(deletedRow: IPPIRow) {
    const idx = findIndex(rows, (r) => r.id === deletedRow.id);

    removePr(deletedRow.id);

    rows.splice(idx, 1);
    setRows([...rows]);
  }

  function handlePackageDelete(packages: IPPIPackage[]) {
    onChange({ rows, packages });
  }

  function abort() {
    onChange(undefined as any);
    onAbort();
  }

  return (
    <div className="space-y-2 select-none">
      <div className="text-center border rounded-sm flex">
        <PPIRowList
          onDeleteRow={handleDeleteRow}
          onUpdatedRow={handleUpdateRow}
          onCreatedRow={handleCreatedRow}
          rows={rows}
          packagePriceRow={packagePriceRow}
        />
        <PPIPackageList
          onDelete={handlePackageDelete}
          onChange={handlePackageChange}
          value={value}
          rows={rows}
          packages={packages}
          packagePriceRow={packagePriceRow}
          onCreatedPackage={handleCreatedPackage}
        />
      </div>
      <Button onClick={abort} className="bg-error w-full">
        {t("abort-set-package-pricing")}
      </Button>
    </div>
  );
};
export default PPIPackageManager;
