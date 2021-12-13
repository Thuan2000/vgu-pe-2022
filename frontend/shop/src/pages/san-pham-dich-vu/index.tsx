import type { GetServerSideProps } from "next";

import PageLayout from "@components/layouts/page-layout";
import React from "react";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { IServiceListItem } from "@graphql/types.graphql";
import { initApollo } from "@utils/apollo";
import { ServicesDocument } from "@graphql/service.graphql";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import SideFilter from "@components/ui/buying-requests/filter/side-filter";
import PleaseOpenOnLaptop from "@components/please-open-on-laptop";
import useIsPhone from "src/hooks/isPhone.hook";
import UnderDevelopment from "@components/under-development";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  const apollo = initApollo();
  const { data } = await apollo.query({
    query: ServicesDocument,
    variables: {
      input: {
        offset: 0,
        limit: 400,
      },
    },
  });

  return {
    props: {
      services: data.services.services,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

interface IProductAndServiceProps {
  services: IServiceListItem[];
}

const ProductAndService: React.FC<IProductAndServiceProps> = ({
  services = [],
}) => {
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
      <main>
        {/* <SideFilter />
        <div className="grid grid-cols-4 gap-x-10 gap-y-3">
          {services?.map((s) => {
            return (
              <div key={s.id} className={`shadow relative`}>
                <div className="relative w-52 h-36 bg-red">
                  <Image
                    src={s.coverImage || siteSettings.logo.url}
                    layout="fill"
                    alt={s.name + "image-preview"}
                  />
                </div>
                {s.name}
              </div>
            );
          })}
        </div> */}
        <UnderDevelopment />
      </main>
    </>
  );
};

(ProductAndService as any).Layout = PageLayout;

export default ProductAndService;
