import FilterIcon from "@assets/icons/filter-icon";
import PageLayout from "@components/layouts/page-layout";
import PleaseOpenOnLaptop from "@components/please-open-on-laptop";
import BuyingRequestsList from "@components/ui/buying-requests/feed/buying-requests-list";
import SideFilter from "@components/ui/buying-requests/filter/side-filter";
import AppliedFilter from "@components/ui/navbar/applied-filter";
import UnderDevelopment from "@components/under-development";
import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import useIsPhone from "src/hooks/isPhone.hook";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = getAuthCredentials(ctx);

  const { locale } = ctx;

  if (!token || !isAuthenticated({ token })) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
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
      <div className="flex relative pb-10">
        <div className="fixed ">
          <SideFilter />
        </div>
        <div className="invisible mr-4">
          <SideFilter />
        </div>
        <div>
          <BuyingRequestsList className="mt-4 w-full space-y-4" />
        </div>
      </div>
    </>
  );
};

(BuyingRequests as any).Layout = PageLayout;

export default BuyingRequests;
