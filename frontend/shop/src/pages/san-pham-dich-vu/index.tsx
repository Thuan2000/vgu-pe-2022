import type { GetServerSideProps } from "next";

import PageLayout from "@components/layouts/page-layout";
import React from "react";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import { useTranslation } from "react-i18next";
import UnderDevelopment from "@components/under-development";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getMeData } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const { company, user } = getMeData();
  if (!company || !user) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const ProductAndService = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("productAndService"))}</title>
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

ProductAndService.Layout = PageLayout;

export default ProductAndService;
