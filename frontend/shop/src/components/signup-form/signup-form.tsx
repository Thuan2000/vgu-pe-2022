import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { toast } from "react-toastify";

import Form from "../form";
import Input from "../ui/storybook/input";
import Checkbox from "../ui/storybook/checkbox";
import Button from "../ui/storybook/button";
import PhoneNumberInput from "../ui/phone-number-input/phone-number-input";
import DocumentInput from "../ui/storybook/document-input";
import {
  useCompanySignupMutation,
  useSeedCompanyMutation,
} from "@graphql/company.graphql";
import { useRouter } from "next/dist/client/router";
import { ROUTES } from "@utils/routes";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import { useCheckEmailMutation } from "@graphql/user.graphql";
import { useSiteSettings } from "src/contexts/site-settings.context";
import { Switch } from "../ui/storybook/inputs/switch-input/switch-input";
import { signupNormalSchema, signupSeedingSchema } from "./signup-schema";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  licenseNumber: string;
  isSubscribeEmail: boolean;
  agreement: boolean;
  phoneNumber: string;
  companyName: string;
  companyShortName: string;
  companyLicenses: Array<File>;
};

function getResettedSignupFormValues() {
  return {
    companyName: undefined,
    companyShortName: undefined,
    email: undefined,
    agreement: undefined,
    firstName: undefined,
    lastName: undefined,
    phoneNumber: undefined,
    isSubscribeEmail: undefined,
    companyLicenses: undefined,
    licenseNumber: undefined,
  };
}

const SignupForm = () => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const { siteEnv } = useSiteSettings();
  const isDev = siteEnv === "dev";

  const [checkEmail, { loading: checking }] = useCheckEmailMutation();
  const [isSeeding, setIsSeeding] = useState(false);

  const [seedCompany] = useSeedCompanyMutation({
    onCompleted: async ({ seedCompany: { success, message } }) =>
      handleMutationResp(success, message),
  });

  const [signup, { loading }] = useCompanySignupMutation({
    onCompleted: async ({ companySignup: { success, message } }) =>
      handleMutationResp(success, message),
  });

  function handleMutationResp(success: boolean, message: string) {
    if (!success) fireErrorModal(message);
    else fireSuccessModal();
  }

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(isSeeding ? signupSeedingSchema : signupNormalSchema),
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
    if (isDenied) router.replace(ROUTES.LOGIN);
  }

  function resetErrorValue() {
    setValue("email", "");
  }

  async function fireSuccessModal() {
    const data = await Swal.fire({
      icon: "success",
      titleText: t(`form:accountCreated-title`),
      text: t(`form:accountCreated-message`),
      confirmButtonText: t(`form:accountCreated-button`),
      confirmButtonColor: COLORS.GREEN,
    });

    reset(getResettedSignupFormValues());
    if (data.isConfirmed && !isSeeding) {
      router.replace(ROUTES.HOMEPAGE);
      toast.success(t("form:accountCreated-toast-title"));
    }
  }

  async function onSubmit({
    companyLicenses,
    agreement,
    isSubscribeEmail = false,
    ...values
  }: FormValues) {
    if (await checkEmailExist()) return;

    if (isSeeding) {
      values.firstName = "seed";
      values.lastName = "user";
    }

    const input = {
      licenseFiles: companyLicenses,
      isSubscribeEmail,
      ...values,
    };

    if (isSeeding) {
      delete (input as any)?.licenseFiles;
      delete (input as any)?.isSubscribeEmail;
      await seedCompany({
        variables: {
          input,
        },
      });
    } else
      await signup({
        variables: { input: input as any },
      });
  }

  async function checkEmailExist() {
    const email = getValues("email");
    const { data } = await checkEmail({ variables: { email } });
    const isExist = data?.checkEmail?.isExist;

    if (isExist) setError("email", { message: "email-exist-error" });
    else clearErrors("email");

    return isExist;
  }

  function handleIsSeedingSwitchChange(e: boolean) {
    setIsSeeding(e);
  }

  return (
    <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
      {isDev && (
        <div className={`mb-5`}>
          <Switch
            onChange={handleIsSeedingSwitchChange as any}
            value={isSeeding as any}
            labelProps={{
              label: t("turn-on-seed-layout"),
              labelFontSize: "md",
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-10 gap-y-3">
        {!isSeeding && (
          <>
            <Input
              className="my-3 md:my-0"
              {...register("firstName")}
              label={t("firstName-label")}
              placeholder={t("firstName-placeholder")}
              error={t(errors?.firstName?.message || "")}
            />

            <Input
              className="my-3 md:my-0"
              {...register("lastName")}
              label={t("lastName-label")}
              placeholder={t("lastName-placeholder")}
              error={t(errors?.lastName?.message || "")}
            />

            <PhoneNumberInput
              control={control}
              className="my-3 md:my-0"
              {...register("phoneNumber")}
              label={t("phoneNumber-label")}
              variant="outline"
              placeholder={t("phoneNumber-placeholder")}
              error={t(errors?.phoneNumber?.message || "")}
            />
          </>
        )}

        <Input
          className="my-3 md:my-0"
          {...register("email")}
          onBlur={checkEmailExist}
          label={t("email-label")}
          placeholder={t("email-placeholder")}
          error={t(errors?.email?.message || "")}
        />

        <Input
          className="my-3 md:my-0"
          {...register("companyName")}
          label={t("companyName-label")}
          placeholder={t("companyName-placeholder")}
          error={t(errors?.companyName?.message || "")}
        />

        <Input
          className="my-3 md:my-0"
          {...register("companyShortName")}
          label={t("companyShortName-label")}
          placeholder={t("companyShortName-placeholder")}
          error={t(errors?.companyShortName?.message || "")}
        />

        <Input
          className="my-3 md:my-0"
          {...register("licenseNumber")}
          label={t("licenseNumber-label")}
          placeholder={t("licenseNumber-placeholder")}
          error={t(errors?.licenseNumber?.message || "")}
        />
      </div>
      {!isSeeding && (
        <div className={`space-y-3`}>
          <div className="mt-3">
            <DocumentInput
              accept=".pdf, .docx, .doc, .ppt, .pptx, .xls, .xlsx"
              inputFileType="application"
              control={control}
              name="companyLicenses"
              label={t("license-label")}
              note={t("license-subLabel")}
              error={t((errors?.companyLicenses as any)?.message || "")}
            />
          </div>
          <div className="space-y-2 md:items-center">
            <Checkbox
              {...register("isSubscribeEmail")}
              label={t("want-to-receive-email")}
              className="mt-5 text-dark-blue text-sm"
            />
            <Checkbox
              className="text-dark-blue text-sm"
              {...register("agreement")}
              label={t("agreement")}
              error={t((errors?.agreement as any)?.message)}
            />
          </div>
        </div>
      )}
      <Button className={`mt-3`} type="submit" loading={loading} size="fluid">
        {t("signup")}
      </Button>
    </Form>
  );
};
export default SignupForm;
