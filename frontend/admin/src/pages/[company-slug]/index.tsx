import PageLayout from "@components/layouts/page-layout";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "next-i18next";
import Typography from "@components/ui/storybook/typography";
import { initApollo, spreadApolloToState } from "@utils/apollo";
import { CompanyDocument } from "@graphql/company.graphql";
import { ICompany } from "@graphql/types.graphql";
import ECBFWItem from "@components/ui/edit-company/ec-add-branch/bfw-item";
import CDUpperRow from "@components/ui/company-details/upper-row";
import CDCertificates from "@components/ui/company-details/cd-certificates";
import CDDetails from "@components/ui/company-details/cd-details";
import CDBfw from "@components/ui/company-details/cd-bfw";
import { ROUTES } from "@utils/routes";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const apollo = initApollo();

  const { data } = await apollo.query({
    query: CompanyDocument,
    variables: { slug: params!["company-slug"] },
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

interface ICompanyDetailProps {
  company: ICompany;
}

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
        {/* Company desc */}

        {/* Certificates & details */}
        <div className={`grid grid-cols-3 gap-x-5`}>
          <CDCertificates certificates={settings?.certificates || []} />
          <CDDetails company={company} />
        </div>

        {/* Branches */}
        <CDBfw
          bfwFor="branch"
          noBfwMessage={t("noBranch-message")}
          bfws={(settings?.branches as any) || []}
        />

        {/* Factories */}
        <CDBfw
          bfwFor="factory"
          noBfwMessage={t("noFactory-message")}
          bfws={(settings?.factories as any) || []}
        />

        {/* Warehouses */}
        <CDBfw
          bfwFor="warehouse"
          noBfwMessage={t("noWarehouse-message")}
          bfws={(settings?.warehouses as any) || []}
        />
      </div>
    </>
  );
};

(CompanyDetail as any).Layout = PageLayout;

export default CompanyDetail;
