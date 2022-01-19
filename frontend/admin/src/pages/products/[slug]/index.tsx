import ImagesSection from "@components/post-tender-form/check-section/images-section";
import ProductDetailInfo from "@components/product-detail/product-detail-info";
import EditDeleteProduct from "@components/product-detail/edit-delete-product";
import SDDescription from "@components/service-detail/sd-desc";
import SDName from "@components/service-detail/sd-name";
import SDPrice from "@components/service-detail/sd-price";
import { ProductDocument } from "@graphql/product.graphql";
import { IProduct } from "@graphql/types.graphql";
import { initApollo } from "@utils/apollo";
import { viDateFormat } from "@utils/functions";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

interface IProductDetailProps {
  product: IProduct;
}

const ProductDetail: React.FC<IProductDetailProps> = ({ product }) => {
  const { t } = useTranslation();
  const {
    name,
    industryId,
    categoryId,
    minPrice,
    price,
    maxPrice,
    description,
    company,
    coverImage,
    gallery,
    createdAt,
    videos,
    certificates,
  } = product;

  return (
    <div>
      <Head>
        <title>{generateHeadTitle(t(name))}</title>
        <meta
          name="description"
          content="DSConnect.VN | Sàn thương mại điện tử B2B đa ngành, uy tín hàng đầu Việt Nam"
        />
      </Head>
      <div className="flex space-x-7 justify-between bg-white p-5 rounded-md shadow">
        <div className="pb-10 w-full">
          <div className="flex space-x-4">
            {/* Right Section */}
            <div className="w-full">
              <SDName
                name={name}
                companyName={company?.name!}
                createdAt={viDateFormat(createdAt)}
              />
              <SDPrice minPrice={minPrice} maxPrice={maxPrice} price={price} />
              <SDDescription
                industryId={industryId}
                categoryId={categoryId}
                description={description || ""}
                companyId={company?.id!}
              />
            </div>

            {/* Left Section */}
            <div>
              <div className="fic">
                <EditDeleteProduct product={product} />
              </div>
              <ImagesSection
                imgWidth={350}
                imgHeight={350}
                getImageSrc={(img) => img.url}
                images={gallery || []}
              />
              {/* <DetailImages coverImage={coverImage!} images={gallery || []} /> */}
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <ProductDetailInfo
              videos={videos || []}
              certificates={certificates || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
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
