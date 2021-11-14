export type GeneralInputNames =
  | "name"
  | "description"
  | "industry"
  | "gallery"
  | "category";

export const INLINE_LABEL_WIDTH = "85px";

export type DetailsInputNames =
  | "minBudget"
  | "maxBudget"
  | "minOrder"
  | "unit"
  | "endDate"
  | "location";

// All general input names | key
export const requiredGeneralInputNames: GeneralInputNames[] = [
  "name",
  "category",
  "industry",
  "description",
];

// All details input names | key
export const requiredDetailsInputNames: DetailsInputNames[] = [
  "minBudget",
  "maxBudget",
  "minOrder",
  "unit",
  "endDate",
  "location",
];

export const GENERAL_FORM_INDEX = 1;
export const DETAILS_FORM_INDEX = 2;
export const CHECK_FORM_INDEX = 3;
