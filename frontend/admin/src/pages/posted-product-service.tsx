import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import PostedServices from "@components/posted-product-service/posted-services";
import UnderDevelopment from "@components/under-development";
import { PAGE_NAME } from "@utils/pagePath";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import React from "react";

const productLabel = "posted-products-page-title";
const serviceLabel = "posted-services-page-title";
const productTarget = "product";
const serviceTarget = "service";

interface IPostedProductServicesProps {}

const PostedProductServices: React.FC<IPostedProductServicesProps> = ({}) => {
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
      <PostPageWrapper noXPadding navs={postedPSNavs}>
        {target === serviceTarget ? (
          <PostedServices />
        ) : (
          <div>
            <UnderDevelopment />
          </div>
        )}
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
