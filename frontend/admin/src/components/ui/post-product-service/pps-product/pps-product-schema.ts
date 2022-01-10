import * as yup from "yup";

const categorySchema = yup.object({
  name: yup.string().required("error-productName-required"),
  industry: yup.object().required("industry-required-error"),
  category: yup.object().required("category-required-error"),
});

const generalSchema = yup.object({});

const detailsSchema = yup.object({
  description: yup
    .string()
    .min(10, "error-productDescription-too-short")
    .required("error-productName-required"),
  location: yup.object().required("error-productLocation-required"),
});

export const ppsProductSchema = yup.object({
  category: categorySchema,
  general: generalSchema,
  // details: detailsSchema,
});
