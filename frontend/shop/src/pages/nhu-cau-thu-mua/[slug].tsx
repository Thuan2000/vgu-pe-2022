import PageLayout from "@components/layouts/page-layout";
import {
  BuyingRequestDocument,
  DiscoveryBuyingRequestsDocument,
  DiscoveryBuyingRequestsQuery,
} from "@graphql/buying-request.graphql";
import { IBuyingRequest, ICompany } from "@graphql/types.graphql";
import { APOLLO_STATE_NAME, initApollo } from "@utils/apollo";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import DetailImages from "@components/ui/detail-image-section";
import Typography from "@components/ui/storybook/typography";
import { getCompanyId, viDateFormat } from "@utils/functions";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BRDSocialShareList from "@components/buying-request-detail/brd-social-share-list";
import BRDName from "@components/buying-request-detail/brd-name";
import BRDPrice from "@components/buying-request-detail/brd-price";
import BRDDescription from "@components/buying-request-detail/brd-desc";
import BRDDetail from "@components/buying-request-detail/brd-detail";
import BRDCompanySummary from "@components/buying-request-detail/brd-company-summary";
import BRDDiscussion from "@components/buying-request-detail/brd-discussion";
import BRDAskQuestion from "@components/buying-request-detail/brd-ask-question";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import BRDAlsoNeeded from "@components/buying-request-detail/brd-also-needed";
import useIsPhone from "src/hooks/isPhone.hook";
import PleaseOpenOnLaptop from "@components/please-open-on-laptop";

interface IBuyingRequestDetailProps {
  br: IBuyingRequest;
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // export const getStaticPaths: any = async (ctx: any) => {
  const { locales } = ctx;
  const apolloClient = initApollo();
  const { data } = await apolloClient.query({
    query: DiscoveryBuyingRequestsDocument,
    variables: {
      input: {
        offset: 0,
        limit: 1000,
      },
    },
  });

  const brs = (data as DiscoveryBuyingRequestsQuery).discoveryBuyingRequests
    .data;

  const paths = brs?.flatMap((product: any) =>
    locales?.map((locale: any) => ({ params: { slug: product.slug }, locale }))
  );

  return { paths: paths as any, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug;

  const apolloClient = initApollo();
  const {
    data: { buyingRequestBySlug: br },
  } = await apolloClient.query({
    query: BuyingRequestDocument,
    variables: { slug },
  });

  if (!br)
    return {
      notFound: true,
    };

  return {
    props: {
      br,
      [APOLLO_STATE_NAME]: apolloClient.cache.extract(),
      revalidate: 60,
      ...(await serverSideTranslations(locale!, [
        "common",
        "industry",
        "category",
        "form",
      ])),
    },
  };
};

const BuyingRequestDetail: React.FC<IBuyingRequestDetailProps> = ({ br }) => {
  const { t } = useTranslation("common");
  const [reload, setReload] = useState(false);

  const isPhone = useIsPhone();
  if (isPhone) return <PleaseOpenOnLaptop />;

  function refetchDiscussions() {
    setReload(!reload);
  }

  return (
    <>
      <Head>
        <title>{generateHeadTitle(br.name)}</title>
        <meta name="description" content={br.description || ""} />
      </Head>
      <div className="flex space-x-7 justify-between">
        <div className="pb-10 w-full">
          <div className="flex space-x-4">
            {/* Left Section */}
            <div>
              <DetailImages
                coverImage={br?.coverImage!}
                images={br.gallery || []}
              />
              <div className="fic space-x-4">
                <Typography
                  text={`${t("brd-share-label")}:`}
                  variant="smallTitle"
                />
                <BRDSocialShareList />
              </div>
            </div>
            {/* Right section */}
            <div className="w-full">
              <BRDName
                name={`${t("requestNamePrefix-value")} - ${br.name}`}
                companyName={br.company.name}
                createdAt={viDateFormat(br.createdAt)}
                status={br.status}
              />
              <BRDPrice
                minBudget={br.minBudget}
                maxBudget={br.maxBudget}
                minOrder={br.minOrder}
                unit={br.unit}
                endDate={br.endDate}
              />
              <BRDDescription
                projects={br.projects || []}
                industryId={br.industryId}
                categoryId={br.categoryId}
                description={br.description || ""}
                companyId={br.company.id}
              />
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <BRDDetail br={br} />
            <BRDCompanySummary company={br.company} />
            <BRDDiscussion reload={reload} brId={parseInt(br.id)} />
            {br.company.id !== getCompanyId() && (
              <BRDAskQuestion
                refetchDiscussions={refetchDiscussions}
                brId={parseInt(br.id)}
              />
            )}
          </div>
        </div>
        <BRDAlsoNeeded brReference={br} />
      </div>
    </>
  );
};

(BuyingRequestDetail as any).Layout = PageLayout;

export default BuyingRequestDetail;
