import HelpIcon from "@assets/icons/navigations/help-icon";
import React, { useState } from "react";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import Typography from "../../typography";
import PPIAddUpdateRowMenu from "./ppi-add-row/ppi-add-update-row-menu";
import { IPPIRow } from "./ppi-interfaces";
import PPITableItemWrapper from "./ppi-table-item-wrapper";

interface IPPIRowHeadItemProps {
  row: IPPIRow;
  rows: IPPIRow[];
  onUpdate?: (r: IPPIRow) => void;
  onDelete?: (r: IPPIRow) => void;
  isDisabled?: boolean;
}

const PPIRowHeadItem: React.FC<IPPIRowHeadItemProps> = ({
  row,
  rows,
  onUpdate,
  onDelete,
  isDisabled,
}) => {
  const [isUpdatingRow, setIsUpdatingRow] = useState(false);
  const [isShowingTooltip, setIsShowingTooltip] = useState(false);
  const wrapperRef = useOutsideClickRef(hideCreateMenu);

  function handleUpdateRow(newRow: IPPIRow) {
    if (onUpdate) onUpdate(newRow);
    hideCreateMenu();
  }

  function hideCreateMenu() {
    setIsUpdatingRow(false);
  }

  function showTooltip() {
    setIsShowingTooltip(true);
  }

  function hideTooltip() {
    setIsShowingTooltip(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <PPITableItemWrapper
        {...(isDisabled ? {} : { onClick: () => setIsUpdatingRow(true) })}
        isHead
        className="border-b cursor-pointer"
      >
        <div className="fic">
          <Typography text={row.name} />
          {row.description && (
            <div className="relative">
              <HelpIcon
                className="ml-2 w-4 h-4"
                onMouseLeave={hideTooltip}
                onMouseEnter={showTooltip}
              />
              {isShowingTooltip && (
                <div className="absolute bg-dark-blue opacity-90 p-2 text-left bottom-full text-white z-50 animate-fadeIn triangle-pointer rounded -translate-y-3 -translate-x-1">
                  {row.description}
                </div>
              )}
            </div>
          )}
        </div>
      </PPITableItemWrapper>
      {isUpdatingRow && (
        <PPIAddUpdateRowMenu
          onDeleteRow={onDelete}
          initValue={row}
          rows={rows}
          onAddRowClick={handleUpdateRow}
        />
      )}
    </div>
  );
};
export default PPIRowHeadItem;
