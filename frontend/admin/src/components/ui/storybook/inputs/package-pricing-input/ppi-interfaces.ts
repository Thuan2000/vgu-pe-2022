export type PPIPriceInputType =
  | "PRICE_RANGE"
  | "PRICE"
  | "DATE"
  | "PLAIN"
  | "ATTACHMENT"
  | "CHECKBOX";

export interface IPPIPriceRangeValue {
  min: number;
  max: number;
}

export interface IPPIPackageRow {
  rowId: string;
  value?: any;
}

export type PPIPriceValue =
  | Date
  | number
  | IPPIPriceRangeValue
  | string
  | boolean
  | File;

export interface IPPIPackage {
  id: string;
  packageRows?: IPPIPackageRow[];
}

export interface IPPIRow {
  id: string;
  name: string;
  inputType: PPIPriceInputType;
  description?: string;
}

export interface IPPIInputType {
  icon: React.FC<React.SVGAttributes<{}>>;
  type: PPIPriceInputType;
  label: string;
}
