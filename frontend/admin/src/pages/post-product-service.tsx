import React from "react";

import PageLayout from "@components/layouts/page-layout";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import { useTranslation } from "react-i18next";
import { PAGE_DESCRIPTION } from "src/seo/description.seo";
import { PAGE_TITLE } from "src/seo/titles.seo";
import PostPageWrapper from "@components/post-page-wrapper";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PostProductServiceForm from "@components/ui/post-product-service/pps-form";
import {
  postProductNavs,
  postServiceNavs,
} from "@components/ui/post-product-service/pps-contstants";
import { useRouter } from "next/dist/client/router";
import HaveToFullInfoWrapper from "@components/have-to-full-info/have-to-full-info-wrapper";

interface IPostProductProps {}
// interface IPostProductProps extends React.HTMLAttributes<HTMLDivElement> {}

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

const PostProduct: React.FC<IPostProductProps> = () => {
  const { t } = useTranslation("form");

  const { query } = useRouter();

  const target = query.target;

  return (
    <div>
      <Head>
        <title>{generateHeadTitle(t(PAGE_TITLE.POST_PRODUCT))}</title>
        <meta name="description" content={PAGE_DESCRIPTION.POST_PRODUCT} />
      </Head>
      {/* <HaveToFullInfoWrapper> */}
      <PostPageWrapper
        navs={target === "product" ? postProductNavs : postServiceNavs}
      >
        <PostProductServiceForm />
      </PostPageWrapper>
      {/* </HaveToFullInfoWrapper> */}
    </div>
  );
};

(PostProduct as any).Layout = PageLayout;

export default PostProduct;
