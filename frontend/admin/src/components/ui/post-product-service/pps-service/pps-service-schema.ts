import * as yup from "yup";

const categorySchema = yup.object({
  name: yup.string().required("error-serviceName-required"),
  industry: yup.object().required("industry-required-error"),
  category: yup.object().required("category-required-error"),
});

export const ppsServiceSchema = yup.object({
  category: categorySchema,
});
