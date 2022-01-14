import { ProductDocument } from "@graphql/product.graphql";
import { IProduct } from "@graphql/types.graphql";
import { initApollo } from "@utils/apollo";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

interface IProductDetailProps {
  product: IProduct;
}

const ProductDetail: React.FC<IProductDetailProps> = ({ product }) => {
  const { name } = product;
  return <div></div>;
};
export default ProductDetail;

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
