import type { GetServerSideProps } from "next";

import PageLayout from "@components/layouts/page-layout";
import React from "react";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import { useTranslation } from "react-i18next";
import UnderDevelopment from "@components/under-development";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const Support = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("support"))}</title>
        <meta
          name="description"
          content="DSConnect.VN | Sàn thương mại điện tử B2B đa ngành, uy tín hàng đầu Việt Nam"
        />
      </Head>
      <main>
        <UnderDevelopment />
      </main>
    </>
  );
};

Support.Layout = PageLayout;

export default Support;
