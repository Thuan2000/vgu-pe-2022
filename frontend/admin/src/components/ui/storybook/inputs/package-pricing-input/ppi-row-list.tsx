import { generateUUID } from "@utils/functions";
import { findIndex } from "lodash";
import React from "react";

import AddRowButton from "./ppi-add-row/ppi-add-row-button";
import { IPPIRow } from "./ppi-interfaces";
import { PPI_PACKAGE_PRICE_NAME } from "./ppi-package-manager";
import PPIRowHeadItem from "./ppi-row-head-item";
import PPITableItemWrapper from "./ppi-table-item-wrapper";

interface IPackageTableRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: IPPIRow[];
  onCreatedRow?: (r: IPPIRow) => void;
  onUpdatedRow?: (r: IPPIRow) => void;
  onDeleteRow?: (r: IPPIRow) => void;
  packagePriceRow: IPPIRow;
}

const PPIRowList: React.FC<IPackageTableRowsProps> = ({
  rows,
  onCreatedRow,
  onUpdatedRow,
  onDeleteRow,
  packagePriceRow,
}) => {
  function handleUpdatedRow(newRow: IPPIRow) {
    if (onUpdatedRow) onUpdatedRow(newRow);
  }

  return (
    <div className="w-1/4 flex-shrink-0">
      {/* Empty box */}
      <PPITableItemWrapper isHead className="border-b" />

      {rows.map((r) => {
        if (r.name === PPI_PACKAGE_PRICE_NAME) return;
        return (
          <PPIRowHeadItem
            key={r.id + "row-list-ppi"}
            onDelete={onDeleteRow}
            onUpdate={handleUpdatedRow}
            isDisabled={!onUpdatedRow && !onDeleteRow}
            rows={rows}
            row={r}
          />
        );
      })}
      {!!onCreatedRow && (
        <AddRowButton rows={rows} onCreatedRow={onCreatedRow} />
      )}
      <PPIRowHeadItem
        key={"package-price" + "row-list-ppi"}
        isDisabled
        rows={rows}
        row={packagePriceRow}
      />
    </div>
  );
};
export default PPIRowList;
