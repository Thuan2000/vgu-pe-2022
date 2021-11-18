import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../../typography";
import { PPIRowMenuItem } from "./ppi-add-row/ppi-add-update-row-menu";
import { ppiRowInputTypes } from "./ppi-constants";
import { IPPIInputType } from "./ppi-interfaces";

interface IPPIRowInputTypeSelectorProps {
  onSelect: (inputType: IPPIInputType) => void;
}

const PPIRowInputTypeSelector: React.FC<IPPIRowInputTypeSelectorProps> = ({
  onSelect,
}) => {
  const { t } = useTranslation("form");

  return (
    <div className="absolute bg-white shadow rounded-sm left-full -translate-x-3 w-full py-1 z-50">
      {ppiRowInputTypes.map((it) => {
        const { icon: Icon, label } = it;
        return (
          <PPIRowMenuItem
            key={it.label + "row-input-selector"}
            onClick={() => onSelect(it)}
          >
            <Icon className="w-4 h-4" fill={COLORS.GRAY[300]} />
            <Typography text={t(label)} className="!text-sm" />
          </PPIRowMenuItem>
        );
      })}
    </div>
  );
};
export default PPIRowInputTypeSelector;
