import { IProductName } from "@graphql/types.graphql";
import { IVietnamCity } from "@utils/vietnam-cities";
import * as yup from "yup";

export const PostRequestSchema = yup.object({
  // General Form
  general: yup.object({
    name: yup.string().required("post-request-name-is-required-error"),
    endDate: yup.string().required("post-request-end-date-required-error"),
    location: yup.object().required("post-request-location-is-required-error"),
    description: yup
      .string()
      .required("post-request-description-is-required-error"),
  }),

  // Details Form
  details: yup.object({
    productName: yup.object().required("productName-required-error"),
    minBudget: yup.number().required("minBudget-required-error"),
    maxBudget: yup
      .number()
      .required("maxBudget-required-error")
      .moreThan(yup.ref("minBudget"), "maxBudget-more-than-error"),
    minOrder: yup.number().required("minOrder-required-error"),
  }),

  additional: yup.object({
    minSupplierExperience: yup
      .number()
      .max(50, "supplierExperience-not-valid-error"),
    minSupplierRating: yup.number().max(5, "supplierRating-not-valid-error"),
  }),
});

export type GeneralFormValue = {
  name: string;
  endDate: Date;
  location: IVietnamCity;
  description?: string;
};

export type DetailsFormValue = {
  productName: IProductName;
  minBudget: number;
  maxBudget: number;
  minOrder: number;
  images: any;
};

export type AdditionalFormValue = {
  categories: any[];
  minSupplierExperience: number;
  minSupplierRating: number;
  minSuplierSells: number;
};

export type PostRequestFormValue = {
  general: GeneralFormValue;
  details: DetailsFormValue;
  additional: AdditionalFormValue;
};
