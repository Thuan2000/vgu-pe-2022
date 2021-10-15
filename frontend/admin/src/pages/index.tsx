import type { GetServerSideProps } from "next";

import { getAuthCredentials, isAuthenticated } from "../utils/auth-utils";
import PageLayout from "@components/layouts/page-layout";
import React from "react";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import { useTranslation } from "react-i18next";
import UnderDevelopment from "@components/under-development";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { loginRedirect } from "@utils/redirects";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, role } = getAuthCredentials(ctx);

  const { locale } = ctx;

  if (!token || !role || !isAuthenticated({ token, role }))
    return loginRedirect;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const Homepage = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("homepage"))}</title>
        <meta
          name="description"
          content="DSConnect.VN | The best B2B Ecommerce in Vietnam provide a fast supply demain chain to fit your need"
        />
      </Head>
      <main>
        <UnderDevelopment />
      </main>
    </>
  );
};

Homepage.Layout = PageLayout;

export default Homepage;
