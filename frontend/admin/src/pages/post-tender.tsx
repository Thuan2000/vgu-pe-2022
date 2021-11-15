import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import PostTenderForm from "@components/post-tender-form";
import PostNavigation from "@components/ui/post-navigation";
import { generateHeadTitle, generatePageDescription } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";
import { PAGE_DESCRIPTION } from "src/seo/description.seo";
import { PAGE_TITLE } from "src/seo/titles.seo";

export const postRequestNavs = [
  {
    label: "general-nav-label",
  },
  {
    label: "details-nav-label",
  },
  {
    label: "check-nav-label",
  },
];

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

const PostRequest = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{generateHeadTitle(t(PAGE_TITLE.POST_TENDER))}</title>
        <meta
          name="description"
          content={generatePageDescription(t(PAGE_DESCRIPTION.POST_TENDER))}
        />
      </Head>
      {/* Navbar here */}

      <PostPageWrapper>
        {/* <p className="text-sm md:text-md text-gray-400 mb-7 pt-4">
          {t("post-request-paragraph")}
        </p> */}

        <PostNavigation navs={postRequestNavs} />

        <PostTenderForm />
      </PostPageWrapper>
    </>
  );
};

PostRequest.Layout = PageLayout;

export default PostRequest;
