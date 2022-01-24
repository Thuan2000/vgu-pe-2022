import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import ForgotPasswordStepItem from "./forgot-password-step";

interface IForgetPasswordStepsProps {}

const ForgetPasswordSteps: React.FC<IForgetPasswordStepsProps> = ({}) => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const step = parseInt((query.step as string) || "1");

  return (
    <div>
      <ForgotPasswordStepItem
        title={t("forgotPassword-email-input-step-title")}
        subtitle={t("forgotPassword-email-input-step-subtitle")}
        isFilled={step > 1}
        isActive={step === 1}
      />
      <ForgotPasswordStepItem
        title={t("forgotPassword-password-input-step-title")}
        subtitle={t("forgotPassword-password-input-step-subtitle")}
        isFilled={step > 2}
        isActive={step === 2}
      />
      <ForgotPasswordStepItem
        title={t("forgotPassword-email-input-step-title")}
        subtitle={t("forgotPassword-email-input-step-subtitle")}
        isFilled={step > 3}
        isActive={step === 3}
        isLast
      />
    </div>
  );
};
export default ForgetPasswordSteps;
