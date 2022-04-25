import * as yup from "yup";

export const SERVICE_MINIMUM_PRICE = 1000;

const generalSchema = yup.object({
  name: yup.string().required("error-serviceName-required"),
  description: yup
    .string()
    .min(10, "error-serviceDescription-too-short")
    .required("error-serviceName-required"),
  location: yup.object().required("error-serviceLocation-required"),
  industry: yup.object().required("industry-required-error"),
  category: yup.object().required("category-required-error"),
});

const pricingSchema = yup.object({
  isSinglePrice: yup.boolean(),
  price: yup.mixed().when("isSinglePrice", {
    is: (isSinglePrice: boolean) => isSinglePrice,
    then: yup
      .number()
      .moreThan(SERVICE_MINIMUM_PRICE, "service-price-invalid-error")
      .required("service-price-required-error"),
  }),
  packages: yup.mixed().when("isSinglePrice", {
    is: (isSinglePrice: boolean) => !isSinglePrice,
    then: yup
      .object()
      .shape({
        packages: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.string().required("package-no-benefit-error"),
              price: yup.number().required("package-price-required"),
            })
          )
          .min(1, "package-no-benefit-error")
          .required("package-no-benefit-error"),
      })
      .required("packages-required-error")
      .nullable(),
  }),
});
const detailsSchema = yup.object({
  tags: yup
    .array()
    .min(1, "error-serviceTags-required-error")
    .required("error-serviceTags-required-error"),
});

export const ppsServiceSchema = yup.object({
  general: generalSchema,
  pricing: pricingSchema,
  details: detailsSchema,
});
