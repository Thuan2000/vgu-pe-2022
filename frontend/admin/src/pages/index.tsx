import type { GetServerSideProps } from "next";

import PageLayout from "@components/layouts/page-layout";
import React from "react";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import { useTranslation } from "react-i18next";
import UnderDevelopment from "@components/under-development";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { getLoggedInUser } from "@utils/functions";
import SuperAdminContent from "@components/super-admin-content";
import HomepageContent from "@components/homepage/homepage-content";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const Homepage = () => {
  const { t } = useTranslation("common");

  const role = getLoggedInUser()?.role;

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
        <HomepageContent />
      </main>
    </>
  );
};

Homepage.Layout = PageLayout;

export default Homepage;
