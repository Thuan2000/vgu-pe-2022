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
  const [data] = useSession();

  useEffect(() => {
    if (data) console.log(data);
  });

  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("common:login"))}</title>
        <meta name="description" content="SDConnect login page" />
      </Head>
      <div className="fixed h-screen w-screen">
        <Image src={ImageIllustration} objectFit="cover" layout="fill" />
      </div>
      <div className="relative md:flex">
        <div className="md:w-4/6 hidden md:block relative h-screen"></div>
        <div className="bg-white min-h-screen py-5 px-7 md:px-0 center-child md:w-3/6">
          <div className=" md:w-3/5 flex flex-col items-center">
            <Logo className="mb-5 md:hidden" />
            <div className="w-full">
              <h1 className="font-bold text-display-2 text-dark-blue">
                {t("login-title")}
              </h1>
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
    </>
  );
};

export default Login;
