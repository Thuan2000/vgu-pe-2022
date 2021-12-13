import BRDBrImages from "@components/ui/detail-image-section";
import BRDSocialShareList from "@components/buying-request-detail/brd-social-share-list";
import PageLayout from "@components/layouts/page-layout";
import SDDescription from "@components/service-detail/sd-desc";
import SDName from "@components/service-detail/sd-name";
import SDPrice from "@components/service-detail/sd-price";
import Typography from "@components/ui/storybook/typography";
import { ServiceDocument } from "@graphql/service.graphql";
import { IService } from "@graphql/types.graphql";
import { initApollo } from "@utils/apollo";
import { viDateFormat } from "@utils/functions";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import BRDAskQuestion from "@components/buying-request-detail/brd-ask-question";
import BRDCompanySummary from "@components/buying-request-detail/brd-company-summary";
import SDDetail from "@components/service-detail/sd-detail";
import BRDDiscussion from "@components/buying-request-detail/brd-discussion";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import SDPackages from "@components/service-detail/sd-packages";
import SDDiscussion from "@components/service-detail/sd-discussion/sdd";
import SDDAskQuestion from "@components/service-detail/sd-discussion/sdd-ask";

interface IServiceDetailProps {
  service: IService;
}

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

  const [reload, setReload] = useState(false);

  function refetchDiscussions() {
    setReload(!reload);
  }

  return (
    <>
      <Head>
        <title>{generateHeadTitle(t(name))}</title>
        <meta
          name="description"
          content="DSConnect.VN | Sàn thương mại điện tử B2B đa ngành, uy tín hàng đầu Việt Nam"
        />
      </Head>
      <div className="flex space-x-7 justify-between">
        <div className="pb-10 w-full">
          <div className="flex space-x-4">
            {/* Left Section */}
            <div>
              <BRDBrImages coverImage={coverImage!} images={images || []} />
              <div className="fic space-x-4">
                <Typography
                  text={`${t("brd-share-label")}:`}
                  variant="smallTitle"
                />
                <BRDSocialShareList />
              </div>
            </div>
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
          </div>
          <div className="space-y-3 mt-4">
            <SDDetail service={service} />
            <BRDCompanySummary company={company} />
            {!!service.packages?.length && (
              <SDPackages
                packages={service.packages}
                rows={service.packageRows!}
              />
            )}
            <SDDiscussion serviceId={service.id} reload={reload} />
            <SDDAskQuestion
              refetchDiscussions={refetchDiscussions}
              serviceId={service.id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;
  const slug = params?.slug;

  const apollo = initApollo();
  const { data } = await apollo.query({
    query: ServiceDocument,
    variables: { slug },
  });

  const service = data.service;

  return {
    props: {
      service,
      ...(await serverSideTranslations(locale!, [
        "common",
        "industry",
        "category",
        "form",
      ])),
    },
  };
};

(ServiceDetail as any).Layout = PageLayout;

export default ServiceDetail;
