import PageLayout from "@components/layouts/page-layout";
import PageWithFilterWrapper from "@components/layouts/page-with-filter-wrapper";
import NeedToLoginWrapper from "@components/need-to-login-wrapper";
import PleaseOpenOnLaptop from "@components/please-open-on-laptop";
import BuyingRequestsList from "@components/ui/buying-requests/feed/buying-requests-list";
import SideFilter from "@components/ui/common-filter/side-filter";
import AppliedFilter from "@components/ui/navbar/applied-filter";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import useIsPhone from "src/hooks/isPhone.hook";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "category",
        "industry",
      ])),
    },
  };
};

const BuyingRequests: React.FC = () => {
  const isPhone = useIsPhone();
  const { t } = useTranslation();

  if (isPhone) return <PleaseOpenOnLaptop />;

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("buying-request-page-title"))}</title>
        <meta
          name="description"
          content="DSConnect.VN | The best B2B Ecommerce in Vietnam provide a fast supply demain chain to fit your need"
        />
      </Head>
      <NeedToLoginWrapper>
        <PageWithFilterWrapper>
          <div className="sticky top-36 h-fit-content">
            <SideFilter />
          </div>
          <div className={`w-full bg-white`}>
            <AppliedFilter />
            <BuyingRequestsList />
          </div>
        </PageWithFilterWrapper>
      </NeedToLoginWrapper>
    </>
  );
};

(BuyingRequests as any).Layout = PageLayout;

export default BuyingRequests;
