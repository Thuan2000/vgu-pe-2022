import { ICategory, IIndustry, IProductName } from "@graphql/types.graphql";
import { IVietnamCity } from "@utils/vietnam-cities";
import * as yup from "yup";

export const PostRequestSchema = yup.object({
  // General Form
  general: yup.object({
    name: yup.string().required("post-request-name-is-required-error"),
    endDate: yup.string().required("post-request-end-date-required-error"),
    location: yup.object().required("post-request-location-is-required-error"),
  }),

  // Details Form
  details: yup.object({
    productName: yup
      .object()
      .required("post-request-productName-required-error"),
    minBudget: yup.number().required("post-request-minBudget-required-error"),
    maxBudget: yup
      .number()
      .required("maxBudget-required-error")
      .min(yup.ref("minBudget"), "post-request-maxBudget-more-than-error"),
    minOrder: yup.number().required("post-request-minOrder-required-error"),
    unit: yup.string().required("post-request-unit-required-error"),
    industry: yup.object().required("industry-required-error"),
    categories: yup.array().min(1, "category-required-error"),
  }),

  additional: yup.object({
    minSupplierExperience: yup
      .number()
      .max(50, "post-request-supplierExperience-not-valid-error"),
    minSupplierRating: yup
      .number()
      .max(5, "post-request-supplierRating-not-valid-error"),
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
  unit: string;
  gallery: any;
  industry: IIndustry;
  categories: ICategory[];
};

export type AdditionalFormValue = {
  allowedCompany?: AllowedCompany[];
};

export type AllowedCompany =
  | { minSupplierExperience?: number }
  | { minSupplierRating?: number }
  | { minSuplierSells?: number };

export type PostRequestFormValue = {
  general: GeneralFormValue;
  details: DetailsFormValue;
  additional: AdditionalFormValue;
};
