import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/dist/client/router";

import PageLayout from "@components/layouts/page-layout";
import PostedRequestsNav from "@components/posted-tenders/posted-tenders-nav";
import { POSTED_REQUEST_VIEWS } from "@components/posted-tenders/posted-tenders-nav/prn-constants";
import BuyingRequests from "../components/posted-tenders/sections/buying-requests";
import Projects from "@components/posted-tenders/sections/projects";
import { generateHeadTitle, generatePageDescription } from "@utils/seo-utils";
import Head from "next/head";
import { PAGE_DESCRIPTION } from "src/seo/description.seo";
import { PAGE_TITLE } from "src/seo/titles.seo";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;
  return {
    props: {
      query,
      ...(await serverSideTranslations(locale!, ["common", "form"])),
    },
  };
};

const PostedTenders = (props: any) => {
  const { t } = useTranslation("common");

  const { query } = useRouter();

  // Default value is buying-requests
  const activeView = query?.view || POSTED_REQUEST_VIEWS.BUYING_REQUESTS;

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t(PAGE_TITLE.POSTED_TENDER))}</title>
        <meta
          name="description"
          content={generatePageDescription(t(PAGE_DESCRIPTION.POST_TENDER))}
        />
      </Head>
      <div className="bg-white md:p-5 rounded-sm md:rounded-lg flex flex-col flex-wrap justify-between pb-5">
        <PostedRequestsNav className="mb-4" />
        {activeView === POSTED_REQUEST_VIEWS.BUYING_REQUESTS && (
          <BuyingRequests />
        )}
        {activeView === POSTED_REQUEST_VIEWS.PROJECTS && <Projects />}
      </div>
    </>
  );
};

PostedTenders.Layout = PageLayout;

export default PostedTenders;
