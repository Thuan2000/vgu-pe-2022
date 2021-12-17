import * as yup from "yup";

const ECFormGeneralResolver = yup.object({
  name: yup.string().required("ec-form-name-required-error"),
  contactNumber: yup.string().required("ec-form-contactNumber-required-error"),
  employeeAmount: yup
    .number()
    .required("ec-form-employeeAmount-required-error"),
  description: yup.string().required("ec-form-description-required-error"),
  location: yup.object().required("error-serviceLocation-required"),
  address: yup.string().required("error-address-required"),
  establishmentDate: yup
    .string()
    .required("ec-form-establishmentDate-required-error"),
  industry: yup.object().required("ec-form-industry-required-error"),
  businessType: yup.object().required("ec-form-businessType-required-error"),
  // mainProducts: yup.array().required("ec-form-mainProducts-required-error"),
});

export const ECFormResolver = yup.object({
  general: ECFormGeneralResolver,
});
