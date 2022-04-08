import * as yup from "yup";

export const signupNormalSchema: any = yup.object({
  firstName: yup.string().required("form:firstName-required-error"),
  lastName: yup.string().required("form:lastName-required-error"),
  phoneNumber: yup.string().required("form:phoneNumber-required-error"),
  companyName: yup.string().required("form:companyName-required-error"),
  companyShortName: yup
    .string()
    .required("form:companyShortName-required-error"),
  licenseNumber: yup.string().required("form:licenseNumber-required-error"),
  email: yup
    .string()
    .required("form:email-required-error")
    .email("form:email-invalid-error"),
  companyLicenses: yup
    .array()
    .min(1, "form:companyLicenses-is-required-error")
    .required("form:companyLicenses-is-required-error"),
  agreement: yup
    .boolean()
    .required("form:agreement-is-shouldBeChecked-error")
    .isTrue("form:agreement-is-shouldBeChecked-error"),
});

export const signupSeedingSchema: any = yup.object({
  companyName: yup.string().required("form:companyName-required-error"),
  companyShortName: yup
    .string()
    .required("form:companyShortName-required-error"),
  licenseNumber: yup.string().required("form:licenseNumber-required-error"),
  email: yup
    .string()
    .required("form:email-required-error")
    .email("form:email-invalid-error"),
});
