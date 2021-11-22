import TrashCanIcon from "@assets/icons/trash-can-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import Button from "../../button";
import Typography from "../../typography";
import { PPIRowMenuItem } from "./ppi-add-row/ppi-add-update-row-menu";
import { PackageMenuType, ppiPackageMenuOpts } from "./ppi-constants";

interface IPPIUpdatePackageProps {
  onDelete: () => void;
}

const PPIUpdatePackage: React.FC<IPPIUpdatePackageProps> = ({ onDelete }) => {
  const { t } = useTranslation("form");

  function getClickHandler(type: PackageMenuType) {
    switch (type) {
      case "DELETE":
        return onDelete;
      default:
        return () => {};
    }
  }

  return (
    <div className="absolute z-40 text-gray-300 select-none text-left pb-3 bg-white right-0 shadow-md">
      {ppiPackageMenuOpts.map((pmo) => {
        const { icon: Icon, type, label } = pmo;
        const onClick = getClickHandler(type);

        return (
          <PPIRowMenuItem
            key={pmo.label + "package-update-package-opt"}
            className="p-2 h-full fic"
            onClick={(e) => {
              e?.stopPropagation();
              onClick();
            }}
          >
            <Icon className="w-4 h-4" fill={COLORS.GRAY[300]} />
            <Typography text={t(label)} className="!text-sm" />
          </PPIRowMenuItem>
        );
      })}
    </div>
  );
};
export default PPIUpdatePackage;
