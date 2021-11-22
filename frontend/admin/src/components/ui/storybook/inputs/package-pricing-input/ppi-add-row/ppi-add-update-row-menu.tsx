import React, { ChangeEvent, useState } from "react";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import Typography from "../../../typography";
import Input from "../../input";
import {
  ppiRowInputTypes,
  ppiRowMenuOpts,
  RowMenuType,
} from "../ppi-constants";
import PPIRowInputTypeSelector from "../ppi-row-input-type-selector";
import { IPPIInputType, IPPIRow, PPIPriceInputType } from "../ppi-interfaces";
import Button from "../../../button";
import TriangleIcon from "@assets/icons/triangle-icon";
import { findIndex } from "lodash";
import {
  callOnEnter,
  createUUID,
  preventSubmitOnEnter,
} from "@utils/functions";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import TextArea from "../../text-area";

interface IPPIRowMenuItemProps {
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
}

export const PPIRowMenuItem: React.FC<IPPIRowMenuItemProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center px-3 py-3 relative space-x-3 w-full ${className}`}
    >
      {children}
    </button>
  );
};

interface IPPIAddUpdateRowMenuProps {
  onAddRowClick: (row: IPPIRow) => void;
  onDeleteRow?: (row: IPPIRow) => void;
  rows: IPPIRow[];
  initValue?: IPPIRow;
}

const PPIAddUpdateRowMenu: React.FC<IPPIAddUpdateRowMenuProps> = ({
  onAddRowClick,
  onDeleteRow,
  rows,
  initValue,
}) => {
  const { t } = useTranslation("form");

  // Value
  const [name, setName] = useState(initValue?.name || "");
  const [description, setDescription] = useState(initValue?.description || "");
  const [selectedType, setSelectedType] = useState<IPPIInputType>(
    getInitInputType(initValue?.inputType) || ppiRowInputTypes[2]
  );

  // Errors
  const nameRequiredError = "error-row-name-required";
  const nameExistError = "error-row-name-exist";
  const [nameError, setNameError] = useState("");

  // Helper
  const [isSettingDescription, setIsSettingDescription] = useState(false);
  const [isSelectingType, setIsSelectingType] = useState(false);
  const { icon: SelectedTypeIcon, label: selectedTypeLabel } = selectedType;
  const outsideClickRef = useOutsideClickRef(() => setIsSelectingType(false));

  function getInitInputType(type?: PPIPriceInputType) {
    const idx = findIndex(ppiRowInputTypes, (rip) => rip.type === type);

    return ppiRowInputTypes[idx];
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);

    if (!e.target.value) setNameError(nameRequiredError);
    if (e.target.value) setNameError("");
  }

  function handleSelectInputType(it: IPPIInputType) {
    setSelectedType(it);
  }

  function isNameExist() {
    return rows.some((r) => {
      if (r.id === initValue?.id) return false;

      return r.name === name;
    });
  }

  function createUpdateRow() {
    if (!name) {
      setNameError(nameRequiredError);
      return;
    }

    if (isNameExist()) {
      setNameError(nameExistError);
      return;
    }

    const newRow: IPPIRow = {
      id: initValue?.id || createUUID(),
      name,
      description,
      inputType: selectedType.type,
    };

    onAddRowClick(newRow);
  }

  function setupDescription() {
    setIsSettingDescription((old) => !old);
  }

  function handleMenuOptClick(type: RowMenuType) {
    if (type === "DELETE" && onDeleteRow) onDeleteRow(initValue!);
    if (type === "DESCRIPTION") setupDescription();
  }

  return (
    <div className="absolute z-40 text-gray-300 select-none text-left top-0 pb-3 bg-white w-full rounded-sm shadow">
      <Input
        inputClassName="!h-7 mt-2 rounded-sm !pl-2 !ring-primary !ring-1"
        noBorder
        className="mx-3"
        value={name}
        error={t(nameError)}
        onChange={handleNameChange}
        autoFocus
        placeholder={t("ppi-row-name-input-placeholder")}
        {...callOnEnter((e) => {
          e.preventDefault();
          createUpdateRow();
        })}
      />

      <div ref={outsideClickRef} className="border-b py-2">
        <Typography
          text={t("ppi-row-property-label")}
          variant="smallTitle"
          className="!text-sm px-3 pb-1 cursor-default"
        />
        <button
          type="button"
          className="px-3 flex items-center space-x-3 w-full py-2"
          // onBlur={() => setIsSelectingType(false)}
          onClick={() => setIsSelectingType((old) => !old)}
        >
          <SelectedTypeIcon className="w-4 h-4" fill={COLORS.GRAY[300]} />
          <Typography text={t(selectedTypeLabel)} className="!text-sm" />
          <TriangleIcon className="w-3 h-3 absolute right-3" />

          {isSelectingType && (
            <PPIRowInputTypeSelector onSelect={handleSelectInputType} />
          )}
        </button>
      </div>

      {ppiRowMenuOpts.map((opt) => {
        const { icon: Icon, label, type } = opt;
        if (!initValue && ["DELETE", "COPY"].includes(type)) return;
        return (
          <PPIRowMenuItem
            key={"ppi-row-menu-opt" + label}
            className="cursor-pointer"
            onClick={() => handleMenuOptClick(type)}
          >
            <Icon className="w-4 h-4" fill={COLORS.GRAY[300]} />
            <Typography text={t(label)} className="!text-sm" />
            {type === "DESCRIPTION" && isSettingDescription && (
              <div className="absolute space-y-2 bg-white shadow rounded-sm left-full -translate-x-2 top-0 w-48 px-2 py-1 z-50">
                <Typography
                  text={t("pps-service-description-label")}
                  align="left"
                />
                <TextArea
                  value={description}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Button color="secondary-1">
                  {t("set-description-button-label")}
                </Button>
              </div>
            )}
          </PPIRowMenuItem>
        );
      })}

      <div className={`mx-3`}>
        <Button
          onClick={createUpdateRow}
          className="w-full"
          color="secondary-1"
        >
          {t(
            initValue
              ? "ppi-row-update-row-button-label"
              : "ppi-row-add-row-button-label"
          )}
        </Button>
      </div>
    </div>
  );
};
export default PPIAddUpdateRowMenu;
