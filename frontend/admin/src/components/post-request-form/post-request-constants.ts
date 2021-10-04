export type GeneralInputNames = "name" | "endDate" | "location" | "description";

export type DetailsInputNames =
  | "productName"
  | "minBudget"
  | "maxBudget"
  | "minOrder"
  | "images";

// All general input names | key
export const generalInputNames: GeneralInputNames[] = [
  "name",
  "endDate",
  "location",
  "description",
];

// All details input names | key
export const detailsInputNames: DetailsInputNames[] = [
  "productName",
  "minBudget",
  "maxBudget",
  "minOrder",
  "images",
];

export const GENERAL_FORM_INDEX = 1;
export const DETAILS_FORM_INDEX = 2;
