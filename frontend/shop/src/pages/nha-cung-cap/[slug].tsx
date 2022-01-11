import PageLayout from "@components/layouts/page-layout";
import UnderDevelopment from "@components/under-development";
import { initApollo, spreadApolloToState } from "@utils/apollo";
import { ROUTES } from "@utils/routes";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { CompanyDocument } from "@graphql/company.graphql";
import { generateHeadTitle } from "@utils/seo-utils";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { ICompany } from "@graphql/types.graphql";
import CDUpperRow from "@components/ui/company-details/upper-row";
import CDCertificates from "@components/ui/company-details/cd-certificates";
import CDDetails from "@components/ui/company-details/cd-details";
import CDBfw from "@components/ui/company-details/cd-bfw";
import CDRequests from "@components/ui/company-details/cd-requests";

interface ICompanyDetailProps {
  company: ICompany;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const apollo = initApollo();

  const { data } = await apollo.query({
    query: CompanyDocument,
    variables: { slug: params!["slug"] },
  });

  const company = data.company;

  if (!company)
    return {
      redirect: {
        destination: ROUTES.HOMEPAGE,
        permanent: false,
      },
    };

  return {
    props: {
      ...spreadApolloToState(apollo),
      company,
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "industry",
        "business-type",
        "category",
      ])),
    },
  };
};

const CompanyDetail: React.FC<ICompanyDetailProps> = ({ company }) => {
  const { t } = useTranslation();
  const { settings } = company || {};
  return (
    <>
      <Head>
        <title>{generateHeadTitle(company?.name || "")}</title>
        <meta name="description" content={company?.description || ""} />
      </Head>
      <div className={`bg-white rounded-md p-6 mb-8 space-y-7`}>
        {/* Upper row */}
        <CDUpperRow company={company} />
        
        <CDDetails company={company} />

        <CDBfw
          bfwFor="factory"
          noBfwMessage={t("noFactory-message")}
          bfws={(settings?.factories as any) || []}
        />
        <CDBfw
          bfwFor="branch"
          noBfwMessage={t("noBranch-message")}
          bfws={(settings?.branches as any) || []}
        />
        <CDCertificates certificates={settings?.certificates || []} />
      </div>
    </>
  );
};

(CompanyDetail as any).Layout = PageLayout;

export default CompanyDetail;
