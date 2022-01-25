/* eslint-disable react-hooks/exhaustive-deps */
import ArrowLeftIcon from "@assets/icons/arrow-left-icon";
import ForgetPasswordSteps from "@components/forget-password/forget-password-steps";
import FPCheckEmail from "@components/forget-password/fp-check-email";
import FPEmailInput from "@components/forget-password/fp-email-input";
import FPNewPasswordInput from "@components/forget-password/fp-new-password-input";
import FPPosition from "@components/forget-password/fp-position";
import LanguageSelector from "@components/ui/language-selector";
import Link from "@components/ui/link";
import Logo from "@components/ui/logo";
import Typography from "@components/ui/storybook/typography";
import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { COLORS } from "@utils/colors";
import { ROUTES } from "@utils/routes";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface IForgetPasswordProps {}

export function getDefaultStep(token?: string) {
  return !!token ? "3" : "1";
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const { token } = getAuthCredentials(ctx);

  if (token && isAuthenticated({ token })) {
    return {
      redirect: {
        destination: ROUTES.HOMEPAGE,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["form", "common"])),
    },
  };
};

const ForgetPassword: React.FC<IForgetPasswordProps> = ({}) => {
  const { t } = useTranslation("form");
  const { query, ...router } = useRouter();
  const token = query.token as string;
  const step = parseInt((query.step as string) || "1");

  function toNextStep() {
    const { pathname } = router;
    router.replace({ pathname, query: { ...query, step: 2 } });
  }

  return (
    <div className={`grid grid-cols-4`}>
      {/* Left */}
      <div
        className={`bg-primary px-10 py-14 col-span-1 min-h-screen space-y-8`}
      >
        <div className="fic justify-between">
          <Logo size="medium" />
          <LanguageSelector textColor={COLORS.WHITE} showText={false} />
        </div>
        <ForgetPasswordSteps />
      </div>
      <div className={`col-span-3 relative space-y-2`}>
        <div className={`absolute x-center y-center w-1/3 space-y-4`}>
          {!token && step === 1 && <FPEmailInput toNextStep={toNextStep} />}
          {!token && step === 2 && <FPCheckEmail />}
          {!!token && <FPNewPasswordInput />}
          <FPPosition />

          <div className={`fic justify-center`}>
            <Link
              href={ROUTES.LOGIN}
              className="fic w-fit-content mt-5 space-x-2 hover:space-x-3 transition-all duration-300"
            >
              <ArrowLeftIcon />
              <Typography text={t("backToLogin-label")} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
