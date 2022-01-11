import { initApollo } from "@utils/apollo";
import { ProductDocument } from "@graphql/product.graphql";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import { PAGE_NAME } from "@utils/pagePath";
import { IProduct } from "@graphql/types.graphql";
import { postProductNavs } from "@components/ui/post-product-service/pps-contstants";
import PPSProductForm from "@components/ui/post-product-service/pps-product/pps-product-form";

interface IEditServiceProps {
  product: IProduct;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const slug = params?.slug;

  const apollo = initApollo();
  const { data } = await apollo.query({
    query: ProductDocument,
    variables: {
      slug,
    },
  });

  const product = data.product;

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "category",
        "industry",
      ])),
    },
  };
};

const EditService: React.FC<IEditServiceProps> = ({ product }) => {
  return (
    <div>
      <PostPageWrapper navs={postProductNavs}>
        <PPSProductForm initValues={product as any} />
      </PostPageWrapper>
    </div>
  );
};

(EditService as any).Layout = PageLayout;
(EditService as any).PageName = PAGE_NAME.POSTED_PRODUCT;

export default EditService;
