import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/client";

import LoginForm from "../components/login-form";
import { generateHeadTitle } from "../utils/seo-utils";
import { getAuthCredentials, isAuthenticated } from "../utils/auth-utils";
import { ROUTES } from "../utils/routes";
import ImageIllustration from "@assets/login-page-illustration.jpg";
import Logo from "@components/ui/logo";
import Link from "@components/ui/link";
import LanguageSelector from "@components/ui/language-selector";
import Typography from "@components/ui/storybook/typography";

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

const Login = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("common:login"))}</title>
        <meta name="description" content="SDConnect login page" />
      </Head>
      <div className="relative">
        <div className="fixed h-screen w-screen">
          <Image
            src={ImageIllustration}
            alt="img-preview"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="relative md:flex">
          <div className="md:w-4/6 hidden md:block relative h-screen"></div>
          <div className="bg-white min-h-screen py-5 px-7 md:px-0 center-child md:w-3/6">
            <div className=" md:w-3/5 flex flex-col items-center">
              <Logo className="mb-5 md:hidden" />
              <div className="w-full">
                <div className="fic justify-between">
                  <Typography weight="bold" size="xl" text={t("login-title")} />
                  <LanguageSelector textColor="black" />
                </div>
                <LoginForm />
                <p className="font-semibold text-sm mt-4">
                  {t("form:no-account-yet")}
                  <Link href={ROUTES.SIGNUP} className="ml-2 text-blue">
                    {t("form:signup")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className={`absolute top-10 right-40 bg-black bg-opacity-40 p-5 rounded-sm`}
        >
          <LanguageSelector textColor="white" />
        </div> */}
      </div>
    </>
  );
};

export default Login;
