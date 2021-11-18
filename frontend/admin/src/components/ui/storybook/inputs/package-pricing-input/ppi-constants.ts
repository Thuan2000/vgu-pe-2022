import AttachIcon from "@assets/icons/attach-icon";
import CheckmarkIcon from "@assets/icons/checkmark-icon";
import CoinIcon from "@assets/icons/coin-icon";
import { IPPIInputType } from "./ppi-interfaces";
import DateIcon from "@assets/icons/date-icon";
import PlainIcon from "@assets/icons/plain-icon";
import HelpIcon from "@assets/icons/navigations/help-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";

export type RowMenuType = "DELETE" | "COPY" | "DESCRIPTION";
export type PackageMenuType = "DELETE";

interface IPPIRowMenuOpt {
  icon: any;
  type: RowMenuType;
  label: string;
}

interface IPPIPackageMenuOpt extends IPPIRowMenuOpt {
  type: PackageMenuType;
}

export const ppiPackageMenuOpts: IPPIPackageMenuOpt[] = [
  {
    icon: TrashCanIcon,
    label: "ppi-package-delete-label",
    type: "DELETE",
  },
];
export const ppiRowMenuOpts: IPPIRowMenuOpt[] = [
  {
    icon: HelpIcon,
    type: "DESCRIPTION",
    label: "ppi-row-description-input-label",
  },
  // {
  //   icon: CopyIcon,
  //   type: "COPY",
  //   label: "ppi-row-duplicate-button-label",
  // },
  {
    icon: TrashCanIcon,
    type: "DELETE",
    label: "ppi-row-delete-button-label",
  },
];

export const ppiRowInputTypes: IPPIInputType[] = [
  {
    icon: DateIcon,
    type: "DATE",
    label: "ppi-row-date-input-type-label",
  },
  {
    icon: AttachIcon,
    type: "ATTACHMENT",
    label: "ppi-row-attachment-input-type-label",
  },
  {
    icon: PlainIcon,
    type: "PLAIN",
    label: "row-input-type-plain-label",
  },
  {
    icon: CheckmarkIcon,
    type: "CHECKBOX",
    label: "ppi-row-checkbox-input-type-label",
  },
  // {
  //   icon: CoinIcon,
  //   type: "PRICE_RANGE",
  //   label: "ppi-row-priceRange-input-type-label",
  // },
  {
    icon: CoinIcon,
    type: "PRICE",
    label: "ppi-row-price-input-type-label",
  },
];
