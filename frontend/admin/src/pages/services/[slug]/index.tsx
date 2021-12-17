import DetailImages from "@components/detail-image-section";
import PageLayout from "@components/layouts/page-layout";
import EditDeleteService from "@components/service-detail/edit-delete-service";
import SDDescription from "@components/service-detail/sd-desc";
import SDDetail from "@components/service-detail/sd-detail";
import SDName from "@components/service-detail/sd-name";
import SDPrice from "@components/service-detail/sd-price";
import Typography from "@components/ui/storybook/typography";
import { ServiceDocument } from "@graphql/service.graphql";
import { IService } from "@graphql/types.graphql";
import { initApollo } from "@utils/apollo";
import { viDateFormat } from "@utils/functions";
import { generateHeadTitle } from "@utils/seo-utils";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import React, { useState } from "react";

interface IServiceDetailProps {
  service: IService;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const slug = params?.slug;

  const apollo = initApollo();
  const { data } = await apollo.query({
    query: ServiceDocument,
    variables: {
      slug,
    },
  });

  const service = data.service;

  return {
    props: {
      service,
      ...(await serverSideTranslations(locale!, [
        "common",
        "category",
        "form",
        "industry",
      ])),
    },
  };
};

const ServiceDetail: React.FC<IServiceDetailProps> = ({ service }) => {
  const { t } = useTranslation();
  const {
    coverImage,
    description,
    name,
    images,
    company,
    maxPrice,
    minPrice,
    price,
    industryId,
    categoryId,
    createdAt,
  } = service;

  return (
    <>
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
                <EditDeleteService service={service} />
              </div>
              <DetailImages coverImage={coverImage!} images={images || []} />
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <SDDetail service={service} />
          </div>
        </div>
      </div>
    </>
  );
};

(ServiceDetail as any).Layout = PageLayout;

export default ServiceDetail;
