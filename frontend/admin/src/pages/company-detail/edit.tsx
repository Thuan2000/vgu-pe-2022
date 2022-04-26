import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import { editCompanyNavs } from "@components/ui/edit-company/ec-constants";
import CompanyDetailsForm from "@components/ui/edit-company/edit-company-form";
import { CompanyDocument } from "@graphql/company.graphql";
import { ICompany } from "@graphql/types.graphql";
import { initApollo, spreadApolloToState } from "@utils/apollo";
import { getMeData, isLogin } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const companySlug = getMeData(ctx).company?.slug;
  if (!companySlug)
    return {
      redirect: {
        destination: ROUTES.LOGIN(),
        permanent: false,
      },
    };
  const apollo = initApollo();

  const { data } = await apollo.query({
    query: CompanyDocument,
    variables: { slug: companySlug },
  });

  const company = data.company;
  return {
    props: {
      company,
      ...spreadApolloToState(apollo),
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "industry",
        "category",
        "business-type",
      ])),
    },
  };
};

interface IEditCompanyProps {
  company: ICompany;
}

const EditCompany: React.FC<IEditCompanyProps> = ({ company }) => {
  return (
    <>
      <Head>
        <title>{generateHeadTitle(company?.name || "")}</title>
        <meta name="description" content={company?.description || ""} />
      </Head>
      <div>
        <CompanyDetailsForm initValue={company!} />
      </div>
    </>
  );
};

(EditCompany as any).Layout = PageLayout;

export default EditCompany;
