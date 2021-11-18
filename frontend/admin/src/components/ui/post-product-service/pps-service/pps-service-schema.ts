import * as yup from "yup";

const categorySchema = yup.object({
  name: yup.string().required("error-serviceName-required"),
  industry: yup.object().required("industry-required-error"),
  category: yup.object().required("category-required-error"),
});

const generalSchema = yup.object({
  // images: yup
  //   .array()
  //   .min(1, "error-serviceImages-required-error")
  //   .required("error-serviceImages-required-error"),
});

const detailsSchema = yup.object({
  description: yup
    .string()
    .min(10, "error-serviceDescription-too-short")
    .required("error-serviceName-required"),
  location: yup.object().required("error-serviceLocation-required"),
  tags: yup
    .array()
    .min(1, "error-serviceTags-required-error")
    .required("error-serviceTags-required-error"),
});

export const ppsServiceSchema = yup.object({
  category: categorySchema,
  general: generalSchema,
  details: detailsSchema,
});
