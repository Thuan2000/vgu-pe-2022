import { PlusIcon } from "@assets/icons/plus-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Button from "../../../button";
import PPIAddUpdateRowMenu from "./ppi-add-update-row-menu";
import { IPPIRow } from "../ppi-interfaces";
import PPITableItemWrapper from "../ppi-table-item-wrapper";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";

interface IAddRowButtonProps {
  onCreatedRow: (e: IPPIRow) => void;
  rows: IPPIRow[];
}

const AddRowButton: React.FC<IAddRowButtonProps> = ({ onCreatedRow, rows }) => {
  const { t } = useTranslation("form");
  const [isCreating, setIsCreating] = useState(false);
  const wrapperRef = useOutsideClickRef(hideCreateMenu);

  function createRow() {
    setIsCreating(true);
  }

  function handleAddNewRow(r: IPPIRow) {
    hideCreateMenu();
    onCreatedRow(r);
  }

  function hideCreateMenu() {
    setIsCreating(false);
  }

  return (
    <div ref={wrapperRef}>
      <PPITableItemWrapper className="bg-secondary-1 !bg-opacity-30 cursor-pointer relative">
        <Button onClick={createRow} variant="custom" className="h-full w-full">
          <PlusIcon fill={COLORS.BOLDER} className="mr-2" />
          {t("input-package-pricing-addRow-label")}
        </Button>
        {isCreating && (
          <PPIAddUpdateRowMenu rows={rows} onAddRowClick={handleAddNewRow} />
        )}
      </PPITableItemWrapper>
    </div>
  );
};
export default AddRowButton;
