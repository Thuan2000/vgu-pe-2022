import * as yup from "yup";

export const MINIMUM_PRICE_RULE = 1000;
export const MINIMUM_PRODUCT_DESC = 100;

const generalSchema = yup.object({
  name: yup.string().required("error-productName-required"),
  industry: yup.object().required("industry-required-error"),
  category: yup.object().required("category-required-error"),
  description: yup
    .string()
    .min(MINIMUM_PRODUCT_DESC, "error-productDescription-too-short")
    .required("error-productDescription-required"),
  minOrder: yup.number().required("error-productMinOrder-required"),
  images: yup
    .array()
    .min(1, "error-productImages-required")
    .required("error-productImages-required"),
});

const pricingSchema = yup.object({
  groups: yup.array(),
  price: yup.mixed().when("groups", {
    is: (data: any) => {
      return !data?.length;
    },
    then: yup
      .number()
      .moreThan(MINIMUM_PRICE_RULE, "invalid-price-error")
      .required("please-set-singlePrice-or-variationsPrice"),
  }),
  variations: yup.mixed().when("groups", {
    is: (data: any) => {
      return !!data?.length;
    },
    then: yup
      .array()
      .of(
        yup.object().shape({
          price: yup
            .number()
            .moreThan(MINIMUM_PRICE_RULE, "variation-price-less-than-error")
            .required("zero-variation-price-error"),
        })
      )
      .min(1, "please-set-singlePrice-or-variationsPrice")
      .required("please-set-singlePrice-or-variationsPrice"),
  }),
});

const detailsSchema = yup.object({
  brandName: yup.string().required("error-productBrand-required"),
  tags: yup
    .array()
    .min(1, "error-productTags-less-than-one")
    .required("error-productTags-less-than-one"),
  location: yup.object().required("error-productLocation-required"),
});

export const ppsProductSchema = yup.object({
  general: generalSchema,
  details: detailsSchema,
  pricing: pricingSchema,
});
