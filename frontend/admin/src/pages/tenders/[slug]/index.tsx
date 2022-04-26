import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import EditDeleteButton from "@components/buying-request-details/edit-delete-button";
import PageLayout from "@components/layouts/page-layout";
import Chip from "@components/ui/chip";
import Loading from "@components/ui/loading";
import Typography from "@components/ui/storybook/typography";
import {
  BuyingRequestBySlugDocument,
  BuyingRequestDocument,
  useBuyingRequestBySlugQuery,
} from "@graphql/buying-request.graphql";
import { IBuyingRequest } from "@graphql/types.graphql";
import { getCategory } from "src/datas/categories";
import {
  formatMoneyAmount,
  getMoneySuffix,
  viDateFormat,
} from "@utils/functions";
import { getIndustry } from "@datas/industries";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { generateHeadTitle } from "@utils/seo-utils";
import UpVIcon from "@assets/icons/up-v-icon";
import { COLORS } from "@utils/colors";
import { initApollo } from "@utils/apollo";

export const getServerSideProps: GetStaticProps = async (ctx) => {
  const { locale, params } = ctx;

  const slug = params!.slug;
  const apollo = initApollo();

  const { data } = await apollo.query({
    query: BuyingRequestBySlugDocument,
    variables: { slug },
  });

  const br = data?.buyingRequestBySlug;

  return {
    props: {
      br,
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "category",
        "industry",
      ])),
    },
  };
};

const BuyingRequestDetails = ({ br }: any) => {
  const { t } = useTranslation("common");

  const createdBy = br.createdBy;

  function getPrice() {
    return `${formatMoneyAmount(br?.minBudget)}${t(
      getMoneySuffix(br?.minBudget)
    )}${t("form:budget-sign")} - ${formatMoneyAmount(br?.maxBudget)}${t(
      getMoneySuffix(br?.maxBudget)
    )}${t("form:budget-sign")}`;
  }

  return (
    <>
      <Head>
        <title>{generateHeadTitle(br?.name as string)}</title>
        <meta name="description" content={br?.description as string} />
      </Head>
      <div className="bg-white p-4">
        <div className="flex">
          <div className="md:w-2/3 flex-shrink-0 w-full">
            {br && (
              <EditDeleteButton
                className="mb-4 md:hidden"
                br={br as IBuyingRequest}
              />
            )}
            <h2 className="text-secondary-1 font-semibold">
              {`${t("form:requestNamePrefix-value")} - `}
              {br?.name}
            </h2>
            <p className="text-lg text-gray-300">{`${createdBy?.firstName} ${createdBy?.lastName}`}</p>
            <Chip
              text={br?.status as string}
              background="secondary-1"
              className="w-fit-content p-1 mt-1 mb-3"
            />
            <div className="md:hidden">
              {!!br?.gallery?.length && (
                <div className="relative border rounded-md h-56 w-80 overflow-hidden">
                  <Image src={br?.gallery[0]?.url || ""} layout="fill" alt="" />
                </div>
              )}
            </div>
            <div className="mt-1 flex items-start">
              <p className="mr-1">{t("delivery-location-text")}:</p>
              <p className="font-semibold">{br?.location}</p>
            </div>
            <div className="mt-1 flex items-start">
              <p className="mr-1">{t("due-time-text")}:</p>
              <p className="font-semibold">{viDateFormat(br?.endDate)}</p>
            </div>
            <div className="mt-1 flex items-start">
              <Typography className="mr-1" text={`${t("industry-text")}:`} />
              <Typography
                variant="smallTitle"
                text={
                  t(
                    "industry:" + getIndustry(br?.industryId as number).label
                  ) || ""
                }
              />
            </div>
            <div className="mt-1 fic">
              <p className="mr-1">{t("budget-text")}:</p>
              <Typography text={getPrice()} variant="smallTitle" />
              <p className="font-semibold"></p>
            </div>
            <div className="mt-1 flex items-start">
              <p className="mr-1">{t("minimum-order-text")}:</p>
              <p className="font-semibold">
                {br?.minOrder} {br?.unit}
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: br?.description || "" }}
              className={`text-gray-400 mt-1 md:mt-2 wysiwyg `}
            />
            <div className="mt-1 flex items-start">
              <p className="mr-1">{t("application")}:</p>
              <p className="font-semibold fic">
                <span className="font-semibold">
                  {t("industry:" + getIndustry(br!.industryId).label)}
                </span>
                <UpVIcon
                  className="rotate-90 mx-1 w-3 h-3"
                  fill={COLORS.BOLDER}
                />
                <span className="font-semibold">
                  {t("category:" + getCategory(br!.categoryId).label)}
                </span>
              </p>
            </div>
          </div>
          <div className="w-1/3 hidden md:block ml-16">
            <EditDeleteButton className="mb-7" br={br as IBuyingRequest} />
            {!!br?.gallery?.length && (
              <div className="relative border rounded-md h-56 w-full overflow-hidden">
                <Image src={br?.gallery[0]?.url || ""} layout="fill" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

BuyingRequestDetails.Layout = PageLayout;

export default BuyingRequestDetails;
