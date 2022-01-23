import DetailImages from "@components/ui/detail-image-section";
import RecordSocialShareList from "@components/record-detail/record-social-share-list";
import PageLayout from "@components/layouts/page-layout";
import RecordDescription from "@components/record-detail/record-desc";
import RecordName from "@components/record-detail/record-name";
import RecordPrice from "@components/record-detail/record-price";
import Typography from "@components/ui/storybook/typography";
import { ServiceDocument } from "@graphql/service.graphql";
import { IService } from "@graphql/types.graphql";
import { initApollo } from "@utils/apollo";
import { viDateFormat } from "@utils/functions";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import RecordCompanySummary from "@components/record-detail/record-company-summary";
import RecordDetail from "@components/record-detail/record-detail";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import RecordPackages from "@components/service-detail/sd-packages";
import RecordDiscussion from "@components/service-detail/sd-discussion/sdd";
import RecordDAskQuestion from "@components/service-detail/sd-discussion/sdd-ask";

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
    location,
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
              <DetailImages coverImage={coverImage!} images={images || []} />
              {/* <div className="fic space-x-4">
                <Typography
                  text={`${t("brd-share-label")}:`}
                  variant="smallTitle"
                />
                <RecordSocialShareList />
              </div> */}
            </div>
            {/* Right Section */}
            <div className="w-full">
              <RecordName
                name={name}
                companyName={company?.name!}
                createdAt={viDateFormat(createdAt)}
              />
              <RecordPrice
                minPrice={minPrice}
                maxPrice={maxPrice}
                price={price}
              />
              <RecordDescription
                location={location}
                industryId={industryId}
                categoryId={categoryId}
                description={description || ""}
                companyId={company?.id!}
              />
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <RecordDetail record={service} />
            <RecordCompanySummary company={company} />
            {!!service.packages?.length && (
              <RecordPackages
                packages={service.packages}
                rows={service.packageRows!}
              />
            )}
            <RecordDiscussion serviceId={service.id} reload={reload} />
            <RecordDAskQuestion
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
