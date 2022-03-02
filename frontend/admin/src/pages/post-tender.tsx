import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import PostTenderForm from "@components/post-tender-form";
import {
  firePleaseFillCompanySwal,
  getIsCompanyFullInfo,
} from "@utils/functions";
import { generateHeadTitle, generatePageDescription } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import useCompanyDetailCheck from "src/hooks/useCompanyDetailCheck";
import { PAGE_DESCRIPTION } from "src/seo/description.seo";
import { PAGE_TITLE } from "src/seo/titles.seo";
import Swal from "sweetalert2";

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
        "source-type",
      ])),
    },
  };
};

const PostRequest = () => {
  const { t } = useTranslation("common");
  const checkCompanyFullInfo = useCompanyDetailCheck();

  useEffect(() => {
    checkCompanyFullInfo();
  }, []);

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t(PAGE_TITLE.POST_TENDER))}</title>
        <meta
          name="description"
          content={generatePageDescription(t(PAGE_DESCRIPTION.POST_TENDER))}
        />
      </Head>

      <PostPageWrapper navs={postRequestNavs}>
        <PostTenderForm />
      </PostPageWrapper>
    </>
  );
};

PostRequest.Layout = PageLayout;

export default PostRequest;
