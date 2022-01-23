import type { GetServerSideProps } from "next";

import PageLayout from "@components/layouts/page-layout";
import React from "react";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IServiceListItem } from "@graphql/types.graphql";
import SideFilter from "@components/ui/common-filter/side-filter";
import PleaseOpenOnLaptop from "@components/please-open-on-laptop";
import useIsPhone from "src/hooks/isPhone.hook";
import ServicesList from "@components/services/services-list";
import AppliedFilter from "@components/ui/navbar/applied-filter";

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

interface IProductAndServiceProps {
  services: IServiceListItem[];
}

const ProductAndService: React.FC<IProductAndServiceProps> = () => {
  const { t } = useTranslation("common");
  const isPhone = useIsPhone();
  if (isPhone) return <PleaseOpenOnLaptop />;

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("productAndService"))}</title>
        <meta
          name="description"
          content="DSConnect.VN | Sàn thương mại điện tử B2B đa ngành, uy tín hàng đầu Việt Nam"
        />
      </Head>
      <main className={`flex space-x-6 mb-10`}>
        <div className="sticky top-40 h-fit-content">
          <SideFilter noStatusFilter />
        </div>
        <div className={`w-full bg-white space-y-3`}>
          <AppliedFilter />
          <ServicesList />
        </div>
      </main>
    </>
  );
};

(ProductAndService as any).Layout = PageLayout;

export default ProductAndService;
