import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import { editCompanyNavs } from "@components/ui/edit-company/ec-constants";
import CompanyDetailsForm from "@components/ui/edit-company/edit-company-form";
import { getMeData } from "@utils/auth-utils";
import { getCompanyName } from "@utils/functions";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "industry",
        "category",
      ])),
    },
  };
};

const EditCompany: React.FC = () => {
  const { company } = getMeData();
  return (
    <>
      <Head>
        <title>{generateHeadTitle(company?.name || "")}</title>
        <meta name="description" content={company?.description || ""} />
      </Head>
      <div>
        <PostPageWrapper navs={editCompanyNavs}>
          <CompanyDetailsForm initValue={company!} />
        </PostPageWrapper>
      </div>
    </>
  );
};

(EditCompany as any).Layout = PageLayout;

export default EditCompany;
