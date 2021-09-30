export type GeneralInputNames = "name" | "endDate" | "location" | "description";

export type DetailsInputNames =
  | "productName"
  | "budget"
  | "minOrder"
  | "attachment";

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
  "budget",
  "minOrder",
  "attachment",
];

export const GENERAL_FORM_INDEX = 1;
export const DETAILS_FORM_INDEX = 2;
