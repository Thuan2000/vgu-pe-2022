import CheckmarkIcon from "@assets/icons/checkmark-icon";
import EmailOutlineIcon from "@assets/icons/email-outline-icon";
import ForgetPasswordSteps from "@components/forget-password/forget-password-steps";
import FPEmailInput from "@components/forget-password/fp-email-input";
import FPPosition from "@components/forget-password/fp-position";
import Form from "@components/form";
import Logo from "@components/ui/logo";
import Button from "@components/ui/storybook/button";
import Input from "@components/ui/storybook/inputs/input";
import Typography from "@components/ui/storybook/typography";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

interface IForgetPasswordProps {}

const ForgetPassword: React.FC<IForgetPasswordProps> = ({}) => {
  const { query } = useRouter();
  const step = parseInt((query.step as string) || "1");
  return (
    <div className={`grid grid-cols-4`}>
      {/* Left */}
      <div
        className={`bg-primary px-10 py-14 col-span-1 min-h-screen space-y-8`}
      >
        <Logo />
        <ForgetPasswordSteps />
      </div>
      <Form className={`col-span-3 relative space-y-2`}>
        <div className={`absolute x-center y-center w-1/3 space-y-4`}>
          {step === 1 && <FPEmailInput />}

          <FPPosition />
        </div>
      </Form>
    </div>
  );
};
export default ForgetPassword;
