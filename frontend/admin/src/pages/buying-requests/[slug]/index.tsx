import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import EditDeleteButton from "@components/buying-request-details/edit-delete-button";
import PageLayout from "@components/layouts/page-layout";
import Chip from "@components/ui/chip";
import Loading from "@components/ui/loading";
import Typography from "@components/ui/storybook/typography";
import { useBuyingRequestBySlugQuery } from "@graphql/buying-request.graphql";
import { IBuyingRequest } from "@graphql/types.graphql";
import { getCategories, getCategory } from "@utils/categories";
import {
  formatMoneyAmount,
  getSuffix,
  thousandSeparator,
  viDateFormat,
} from "@utils/functions";
import { getIndustry } from "@utils/industries";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const getServerSideProps: GetStaticProps = async (ctx) => {
  const { locale, params } = ctx;
  return {
    props: {
      ...params,
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "category",
        "industry",
      ])),
    },
  };
};

const BuyingRequestDetails = ({ slug, ...props }: any) => {
  const { t } = useTranslation("common");
  const { data, loading, refetch } = useBuyingRequestBySlugQuery({
    variables: { slug },
  });
  const br = data?.buyingRequestBySlug;
  const createdBy = data?.buyingRequestBySlug.createdBy;

  useEffect(() => {
    refetch({ slug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  // function getParticipantFilter(allowedCompany: IAllowedCompany) {
  //   if (!allowedCompany) return t("NO_PARTICIPANT_FILTER_TEXT");
  //   let text = "";
  //   Object.keys(allowedCompany)?.map((key: string) => {
  //     if (key === "__typename") return;
  //     const fi = (allowedCompany as any)[key];
  //     if (!fi) return;
  //     text += `${t("form:company-with-label")} ${thousandSeparator(fi)} ${t(
  //       "form:" + key + "-filter-key"
  //     )}, `;
  //   });
  //   return text || t("no-filter");
  // }

  return (
    <div className="bg-white p-4">
      <div className="flex">
        <div className="md:w-2/3 flex-shrink-0 w-full">
          {br && (
            <EditDeleteButton
              className="mb-4 md:hidden"
              br={br as IBuyingRequest}
            />
          )}
          <h2 className="text-secondary-1 font-semibold">{br?.name}</h2>
          <p className="text-lg text-gray-300">{`${createdBy?.firstName} ${createdBy?.lastName}`}</p>
          <Chip
            text={br?.status as string}
            background="secondary-1"
            className="w-fit-content p-1 mt-1 mb-3"
          />
          <div className="md:hidden">
            {!!br?.gallery?.length && (
              <div className="relative border rounded-md h-56 w-80 overflow-hidden">
                <Image
                  src={br?.gallery[0]?.location || ""}
                  layout="fill"
                  alt=""
                />
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
                t("industry:" + getIndustry(br?.industryId as number).label) ||
                ""
              }
            />
          </div>
          <div className="mt-1 flex items-start">
            <p className="mr-1">{t("budget-text")}:</p>
            <p className="font-semibold">
              {formatMoneyAmount(br?.minBudget)}
              {t("common:" + getSuffix(br?.minBudget))}-{" "}
              {formatMoneyAmount(br?.maxBudget)}
              {t("common:" + getSuffix(br?.maxBudget))}
            </p>
          </div>
          <div className="mt-1 flex items-start">
            <p className="mr-1">{t("minimum-order-text")}:</p>
            <p className="font-semibold">
              {br?.minOrder} {br?.unit}
            </p>
          </div>
          <p className="text-gray-400 mt-1 md:mt-2">{br?.description}</p>
          {/* <div className="mt-1 flex items-start">
            <p className="mr-1">{t("participants-text")}:</p>
            <Typography
              text={getParticipantFilter(br?.allowedCompany as IAllowedCompany)}
              className="font-semibold"
            />
          </div> */}
          <div className="mt-1 flex items-start">
            <p className="mr-1">{t("application")}:</p>
            <p className="font-semibold">
              {!!br?.categoryId ? (
                <span className="font-semibold">
                  {t("category:" + getCategory(br.categoryId).label)}
                </span>
              ) : (
                <span className="font-semibold">{t("no-type")}</span>
              )}
            </p>
          </div>
        </div>
        <div className="w-1/3 hidden md:block ml-16">
          <EditDeleteButton className="mb-7" br={br as IBuyingRequest} />
          {!!br?.gallery?.length && (
            <div className="relative border rounded-md h-56 w-full overflow-hidden">
              <Image
                src={br?.gallery[0]?.location || ""}
                layout="fill"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BuyingRequestDetails.Layout = PageLayout;

export default BuyingRequestDetails;
