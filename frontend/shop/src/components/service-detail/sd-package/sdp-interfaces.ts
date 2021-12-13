export type SDPPriceInputType =
  | "PRICE_RANGE"
  | "PRICE"
  | "DATE"
  | "PLAIN"
  | "ATTACHMENT"
  | "CHECKBOX";

export interface ISDPPriceRangeValue {
  min: number;
  max: number;
}

export interface ISDPPackageRow {
  rowId: string;
  value?: any;
}

export type SDPPriceValue =
  | Date
  | number
  | ISDPPriceRangeValue
  | string
  | boolean
  | File;

export interface ISDPPackage {
  id: string;
  packageRows?: ISDPPackageRow[];
}

export interface ISDPRow {
  id: string;
  name: string;
  inputType: SDPPriceInputType;
  description?: string;
}

export interface ISDPInputType {
  icon: React.FC<React.SVGAttributes<{}>>;
  type: SDPPriceInputType;
  label: string;
}
