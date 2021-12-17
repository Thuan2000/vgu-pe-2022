import CheckmarkIcon from "@assets/icons/checkmark-icon";
import XIcon from "@assets/icons/x-icon";
import { IPackageRow } from "@graphql/types.graphql";
import {
  formatMoneyAmount,
  getMoneySuffix,
  viDateFormat,
} from "@utils/functions";
import { findIndex } from "lodash";
import { useTranslation } from "next-i18next";
import React from "react";
import { SDP_PACKAGE_PRICE_NAME } from "../sd-packages";
import { ISDPPackage, ISDPRow } from "./sdp-interfaces";
import SDPTableItemWrapper from "./sdp-item-wrapper";

interface ISDPPackageItemProps {
  rows: IPackageRow[];
  pkg: ISDPPackage;
  idx: number;
}

const SDPPackageItem: React.FC<ISDPPackageItemProps> = ({ rows, pkg, idx }) => {
  const { t } = useTranslation();
  let packagePriceRow = {};
  function getRowValue(row: ISDPRow) {
    const idx = findIndex(pkg?.packageRows, (pr) => row?.id === pr?.rowId);
    if (idx === -1) return "-";
    if (!pkg?.packageRows) return;

    const packageRowValue = JSON.parse(pkg?.packageRows?.[idx].value);
    if (row.inputType === "ATTACHMENT") return packageRowValue.path;
    else if (row.inputType === "DATE") return viDateFormat(packageRowValue);
    else if (row.inputType === "PRICE")
      return `${formatMoneyAmount(packageRowValue)}${t(
        getMoneySuffix(packageRowValue)
      )} ${t("budget-sign")}`;
    else if (row.inputType === "CHECKBOX")
      return packageRowValue ? <CheckmarkIcon /> : <XIcon />;

    return packageRowValue;
  }

  return (
    <div className={`flex-shrink-0 select-none w-1/2`}>
      {/* <CreateableSelect options={[]} /> */}
      <SDPTableItemWrapper className="relative cursor-pointer" isHead>
        {`${t("package-text")} ` + (idx + 1)}
      </SDPTableItemWrapper>
      {rows?.map((row: any) => {
        if (row.name === SDP_PACKAGE_PRICE_NAME) {
          packagePriceRow = row;
          return;
        }
        return (
          <SDPTableItemWrapper
            key={"ppi-package-item" + row.id + pkg.id}
            className="border-b overflow-hidden"
          >
            {getRowValue(row)}
          </SDPTableItemWrapper>
        );
      })}

      <SDPTableItemWrapper
        key={"ppi-package-item" + "package price" + pkg.id}
        className="border-b overflow-hidden"
      >
        {getRowValue(packagePriceRow as any)}
      </SDPTableItemWrapper>
    </div>
  );
};
export default SDPPackageItem;
