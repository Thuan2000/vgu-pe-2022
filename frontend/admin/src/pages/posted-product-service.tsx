import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import PostedProducts from "@components/posted-product-service/posted-products";
import PostedServices from "@components/posted-product-service/posted-services";
import UnderDevelopment from "@components/under-development";
import { PAGE_NAME } from "@utils/pagePath";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

const productLabel = "posted-products-page-title";
const serviceLabel = "posted-services-page-title";
const productTarget = "product";
const serviceTarget = "service";

interface IPostedProductServicesProps {}

const PostedProductServices: React.FC<IPostedProductServicesProps> = ({}) => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();
  const target = query.target;
  function getIsActiveProductNav(label: string) {
    return label === productLabel && target !== serviceTarget;
  }

  function getIsActiveServiceNav(label: string) {
    return label === serviceLabel && target === serviceTarget;
  }

  function handleNavClick(label: string) {
    if (label === productLabel && target !== serviceTarget) return;
    if (label === serviceLabel && target === serviceTarget) return;

    const { pathname } = router;

    router.replace({
      pathname,
      query: {
        ...query,
        target: label === productLabel ? productTarget : serviceTarget,
      },
    });
  }

  const postedPSNavs = [
    {
      label: productLabel,
      getIsActive: getIsActiveProductNav,
      onClick: handleNavClick,
    },
    {
      label: serviceLabel,
      getIsActive: getIsActiveServiceNav,
      onClick: handleNavClick,
    },
  ];

  return (
    <div>
      <Head>
        <title>{generateHeadTitle(t("productAndService"))}</title>
        <meta
          name="description"
          content="DSConnect.VN | Sàn thương mại điện tử B2B đa ngành, uy tín hàng đầu Việt Nam"
        />
      </Head>
      <PostPageWrapper noXPadding navs={postedPSNavs}>
        {target === serviceTarget ? <PostedServices /> : <PostedProducts />}
      </PostPageWrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;
  return {
    props: {
      query,
      ...(await serverSideTranslations(locale!, ["common", "form"])),
    },
  };
};

(PostedProductServices as any).Layout = PageLayout;
(PostedProductServices as any).PageName = PAGE_NAME.POSTED_PRODUCT;

export default PostedProductServices;
