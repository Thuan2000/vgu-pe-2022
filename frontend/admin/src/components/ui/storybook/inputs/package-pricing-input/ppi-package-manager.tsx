import React, { useEffect, useRef, useState } from "react";
import PPIRowList from "./ppi-row-list";
import { IPPIPackage, IPPIRow } from "./ppi-interfaces";
import PPIPackageList from "./ppi-package-list";
import { findIndex } from "lodash";
import { createUUID } from "@utils/functions";
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

const PPIPackageManager: React.FC<IPPIPackageManagerProps> = ({
  onChange,
  value,
  onAbort,
}) => {
  const { t } = useTranslation("form");
  const [rows, setRows] = useState<IPPIRow[]>(value?.rows || []);
  const [packages, setPackages] = useState<IPPIPackage[]>(
    value?.packages || [{ id: createUUID() }]
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
    <div className="space-y-2">
      <div className="text-center border rounded-sm flex">
        <PPIRowList
          onDeleteRow={handleDeleteRow}
          onUpdatedRow={handleUpdateRow}
          onCreatedRow={handleCreatedRow}
          rows={rows}
        />
        <PPIPackageList
          onDelete={handlePackageDelete}
          onChange={handlePackageChange}
          value={value}
          rows={rows}
          packages={packages}
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
