import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { toast } from "react-toastify";

import Form from "./form";
import Input from "./ui/storybook/input";
import Checkbox from "./ui/storybook/checkbox";
import Button from "./ui/storybook/button";
import PhoneNumberInput from "./ui/phone-number-input/phone-number-input";
import DocumentInput from "./ui/storybook/document-input";
import { useCompanySignupMutation } from "@graphql/company.graphql";
import { useRouter } from "next/dist/client/router";
import { ROUTES } from "@utils/routes";
// import { setAuthCredentials, setMeData } from "@utils/auth-utils";
// import { useMeInfoMutation } from "@graphql/auth.graphql";
// import { IMeInfoResponse } from "@graphql/types.graphql";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  licenseNumber: string;
  password: string;
  confirmPassword: string;
  emailSubscription: boolean;
  agreement: boolean;
  phoneNumber: string;
  companyName: string;
  companyLicenses: Array<File>;
};

const signupSchema: any = yup.object({
  firstName: yup.string().required("form:firstName-required-error"),
  lastName: yup.string().required("form:lastName-required-error"),
  phoneNumber: yup.string().required("form:phoneNumber-required-error"),
  companyName: yup.string().required("form:companyName-required-error"),
  licenseNumber: yup.string().required("form:licenseNumber-required-error"),
  email: yup
    .string()
    .required("form:email-required-error")
    .email("form:email-invalid-error"),
  password: yup.string().required("form:password-required-error"),
  confirmPassword: yup
    .string()
    .required("form:password-required-error")
    .oneOf([yup.ref("password"), null], "form:password-not-match-error"),
  companyLicenses: yup
    .array()
    .min(1, "form:companyLicenses-is-required-error")
    .required("form:companyLicenses-is-required-error"),
  agreement: yup
    .boolean()
    .required("form:agreement-is-shouldBeChecked-error")
    .isTrue("form:agreement-is-shouldBeChecked-error"),
});

const SignupForm = () => {
  const { t } = useTranslation("form");
  const router = useRouter();
  // const [meInfo] = useMeInfoMutation();
  const [signup, { loading }] = useCompanySignupMutation({
    onCompleted: async ({ companySignup: { success, message } }) => {
      if (!success) fireErrorModal(message);
      else fireSuccessModal();

      // setAuthCredentials(token as string, role as string);
      // const { data } = await meInfo();
      // setMeData(data?.meInfo as IMeInfoResponse);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(signupSchema),
  });

  async function fireErrorModal(message: string) {
    const { isDenied, isConfirmed } = await Swal.fire({
      icon: "error",
      titleText: t(`form:signupError-${message}-title`),
      text: t(`form:signupError-${message}-message`),
      confirmButtonText: t(`form:signupError-stay-button-title`),
      confirmButtonColor: COLORS.GREEN,
      denyButtonText: t(`form:accountCreated-button`),
      denyButtonColor: COLORS.WARNING,
      showDenyButton: true,
    });

    if (isConfirmed) resetErrorValue();
    if (isDenied) router.replace(ROUTES.HOMEPAGE);
  }

  function resetErrorValue() {
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
  }

  async function fireSuccessModal() {
    const data = await Swal.fire({
      icon: "success",
      titleText: t(`form:accountCreated-title`),
      text: t(`form:accountCreated-message`),
      confirmButtonText: t(`form:accountCreated-button`),
      confirmButtonColor: COLORS.GREEN,
    });

    if (data) {
      router.replace(ROUTES.HOMEPAGE);
      toast.success(t("form:accountCreated-toast-title"));
    }
  }

  async function onSubmit({
    companyLicenses,
    confirmPassword,
    agreement,
    ...values
  }: FormValues) {
    const input = {
      licenseFiles: companyLicenses,
      ...values,
    };

    await signup({
      variables: { input: input as any },
    });
  }

  return (
    <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex md:my-3">
        <Input
          className="my-3 md:my-0 md:w-96 md:mr-16"
          {...register("firstName")}
          label={t("firstName-label")}
          placeholder={t("firstName-placeholder")}
          error={t(errors?.firstName?.message || "")}
        />
        <Input
          className="my-3 md:my-0 md:w-96"
          {...register("lastName")}
          label={t("lastName-label")}
          placeholder={t("lastName-placeholder")}
          error={t(errors?.lastName?.message || "")}
        />
      </div>
      <div className="md:flex md:my-3">
        <PhoneNumberInput
          control={control}
          className="my-3 md:my-0 md:w-96 md:mr-16"
          {...register("phoneNumber")}
          label={t("phoneNumber-label")}
          variant="outline"
          placeholder={t("phoneNumber-placeholder")}
          error={t(errors?.phoneNumber?.message || "")}
        />
        {/* @TODO: OnBlur check if the email is exist */}
        <Input
          className="my-3 md:my-0 md:w-96"
          {...register("email")}
          label={t("email-label")}
          placeholder={t("email-placeholder")}
          error={t(errors?.email?.message || "")}
        />
      </div>
      <div className="md:flex md:my-3">
        <Input
          className="my-3 md:my-0 md:w-96 md:mr-16"
          {...register("password")}
          label={t("password-label")}
          type="password"
          placeholder={t("password-placeholder")}
          error={t(errors?.password?.message || "")}
        />
        <Input
          className="my-3 md:my-0 md:w-96"
          {...register("confirmPassword")}
          label={t("confirmPassword-label")}
          type="password"
          placeholder={t("confirmPassword-label")}
          error={t(errors?.confirmPassword?.message || "")}
        />
      </div>
      <div className="md:flex md:my-3">
        <Input
          className="my-3 md:my-0 md:w-96 md:mr-16"
          {...register("companyName")}
          label={t("companyName-label")}
          placeholder={t("companyName-placeholder")}
          error={t(errors?.companyName?.message || "")}
        />
        <Input
          className="my-3 md:my-0 md:w-96"
          {...register("licenseNumber")}
          label={t("licenseNumber-label")}
          placeholder={t("licenseNumber-placeholder")}
          error={t(errors?.licenseNumber?.message || "")}
        />
      </div>
      <div className="mt-1">
        <DocumentInput
          accept=".pdf, .docx, .doc, .ppt, .pptx, .xls, .xlsx"
          inputFileType="application"
          // Make this thing work later
          // accessControl="BUCKET_OWNER_FULL_CONTROL"
          control={control}
          name="companyLicenses"
          label={t("license-label")}
          note={t("license-subLabel")}
          error={t((errors?.companyLicenses as any)?.message || "")}
        />
      </div>
      <div className="my-3 md:items-center">
        <Checkbox
          {...register("emailSubscription")}
          label={t("want-to-receive-email")}
          className="mt-5 mb-2 text-dark-blue text-sm"
        />
        <Checkbox
          className="text-dark-blue text-sm"
          {...register("agreement")}
          label={t("agreement")}
          error={t((errors?.agreement as any)?.message)}
        />
      </div>
      <Button type="submit" loading={loading} size="fluid">
        {t("signup")}
      </Button>
    </Form>
  );
};
export default SignupForm;
