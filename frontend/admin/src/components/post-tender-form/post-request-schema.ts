import { IIndustry } from "@datas/industries";
import { ICategory } from "src/datas/categories";
import { IVietnamCity } from "@utils/vietnam-cities";
import * as yup from "yup";
import { ISourceType } from "src/datas/source-type";
import { IFile } from "@graphql/types.graphql";

export const PostRequestSchema = yup.object({
  // General Form
  general: yup.object({
    name: yup.string().required("post-request-name-is-required-error"),
    description: yup
      .string()
      .required("post-request-description-is-required-error"),
    industry: yup.object().required("industry-required-error"),
    category: yup.object().required("category-required-error"),
  }),

  // Details Form
  details: yup.object({
    endDate: yup.string().required("post-request-end-date-required-error"),
    location: yup.object().required("post-request-location-is-required-error"),
    minBudget: yup.number().required("post-request-minBudget-required-error"),
    maxBudget: yup
      .number()
      .required("maxBudget-required-error")
      .min(yup.ref("minBudget"), "post-request-maxBudget-more-than-error"),
    minOrder: yup.number().required("post-request-minOrder-required-error"),
    unit: yup.string().required("post-request-unit-required-error"),
    // productName: yup
    //   .object()
    //   .required("post-request-productName-required-error")
    //   .nullable(),
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
  industry: IIndustry;
  category: ICategory;
  gallery: IFile[];
  description?: string;
};

export type DetailsFormValue = {
  // productName: IProductName;
  minBudget: number;
  maxBudget: number;
  minOrder: number;
  unit: string;
  endDate: Date;
  location: IVietnamCity;
  sourceType?: ISourceType;
  allowedCompany?: AllowedCompany;
};

export type AllowedCompany = {
  minSupplierExperience?: number;
  minSupplierSells?: number;
};

export type PostRequestFormValue = {
  general: GeneralFormValue;
  details: DetailsFormValue;
};
