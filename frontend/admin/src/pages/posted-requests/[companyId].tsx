import PageLayout from "@components/layouts/page-layout";
import UnderDevelopment from "@components/under-development";
import { useBuyingRequestsQuery } from "@graphql/buying-request.graphql";
import { PAGE_NAME } from "@utils/constants";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslation } from "react-i18next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;

  return {
    props: {
      query,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const PostedRequests = (props: any) => {
  const { companyId } = props.query;
  const { t } = useTranslation();

  const { data, loading, error } = useBuyingRequestsQuery({
    variables: { companyId: parseInt(companyId) },
  });
  return <UnderDevelopment />;
};

PostedRequests.Layout = PageLayout;
PostedRequests.PageName = PAGE_NAME.POSTED_REQUESTS;

export default PostedRequests;
