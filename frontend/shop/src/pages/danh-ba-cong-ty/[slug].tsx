import PageLayout from "@components/layouts/page-layout";
import UnderDevelopment from "@components/under-development";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

interface ICompanyDetailProps {}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const CompanyDetail: React.FC<ICompanyDetailProps> = ({}) => {
  return (
    <div>
      <UnderDevelopment />
    </div>
  );
};

(CompanyDetail as any).Layout = PageLayout;

export default CompanyDetail;
