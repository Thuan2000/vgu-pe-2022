import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import EditDeleteButton from "@components/buying-request-details/edit-delete-button";
import PageLayout from "@components/layouts/page-layout";
import Chip from "@components/ui/chip";
import Loading from "@components/ui/loading";
import Button from "@components/ui/storybook/button";
import { useBuyingRequestQuery } from "@graphql/buying-request.graphql";
import { IAllowedCompany, IBuyingRequest } from "@graphql/types.graphql";
import { getMeData } from "@utils/auth-utils";
import {
  formatMoneyAmount,
  thousandSeparator,
  viDateFormat,
} from "@utils/functions";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

export const getServerSideProps: GetStaticProps = async (ctx) => {
  const { locale, params } = ctx;
  return {
    props: {
      ...params,
      ...(await serverSideTranslations(locale!, ["common", "form"])),
    },
  };
};

const BuyingRequestDetails = ({ slug, ...props }: any) => {
  const { t } = useTranslation("common");
  const { data, loading } = useBuyingRequestQuery({ variables: { slug } });
  const { company } = getMeData();
  const br = data?.buyingRequest;

  if (loading) return <Loading />;

  function getParticipantFilter(allowedCompany: IAllowedCompany) {
    if (!allowedCompany) return;

    let text = "";
    Object.keys(allowedCompany)?.map((key: string) => {
      if (key === "__typename") return;
      const fi = (allowedCompany as any)[key];
      if (!fi) return;
      text += `${t("form:company-with-label")} ${thousandSeparator(fi)} ${t(
        "form:" + key + "-filter-key"
      )}, `;
    });
    return text || t("no-filter");
  }

  return (
    <div className="bg-white p-4">
      <div className="flex">
        <div className="md:w-2/3 flex-shrink-0 w-full">
          <EditDeleteButton
            className="mb-4 md:hidden"
            br={br as IBuyingRequest}
          />
          <h2 className="text-secondary-1 font-semibold">{br?.name}</h2>
          <p className="text-lg text-gray-300">{company?.licenseNumber}</p>
          <Chip
            text={br?.status as string}
            background="secondary-1"
            className="w-fit-content p-1 mt-1 mb-3"
          />
          <div className="md:hidden">
            {!!br?.gallery?.length && (
              <div className="relative border rounded-md h-56 w-80 overflow-hidden">
                <Image
                  src={br.gallery[0]?.location || ""}
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
            <p className="mr-1">{t("categories-text")}:</p>
            {!!br?.categories?.length ? (
              br.categories.map((ctgr) => (
                <p className="font-semibold" key={ctgr + "category" + br.id}>
                  {ctgr}
                </p>
              ))
            ) : (
              <p className="font-semibold">{t("no-type")}</p>
            )}
          </div>
          <div className="mt-1 flex items-start">
            <p className="mr-1">{t("budget-text")}:</p>
            <p className="font-semibold">
              {formatMoneyAmount(br?.minBudget)}-{" "}
              {formatMoneyAmount(br?.maxBudget)}
            </p>
          </div>
          <div className="mt-1 flex items-start">
            <p className="mr-1">{t("minimum-order-text")}:</p>
            <p className="font-semibold">
              {br?.minOrder} {br?.unit}
            </p>
          </div>
          <p className="text-gray-400 mt-1 md:mt-2">{br?.description}</p>
          {/* <p className="text-gray-400 mt-1 md:my-2">
            Miêu tả ngắn về nhu cầu mua We are looking for a supplier to buy 500
            tons of wires in Hanoi to install lamps in central park. Miêu tả
            ngắn về nhu cầu mua We are looking for a supplier to buy 500 tons of
            wires in Hanoi to install lamps in central park.
          </p> */}

          <div className="mt-1 flex items-start">
            <p className="mr-1">{t("participants-text")}:</p>
            <p className="font-semibold">
              {getParticipantFilter(br?.allowedCompany as IAllowedCompany)}
            </p>
          </div>
          <div className="mt-1 flex items-start">
            <p className="mr-1">{t("application")}:</p>
            <p className="font-semibold">
              {!!br?.categories?.length ? (
                br.categories.map((ctgr) => (
                  <p className="font-semibold" key={ctgr + "category" + br.id}>
                    {ctgr}
                  </p>
                ))
              ) : (
                <p className="font-semibold">{t("no-type")}</p>
              )}
            </p>
          </div>
        </div>
        <div className="w-1/3 hidden md:block ml-16">
          <EditDeleteButton className="mb-7" br={br as IBuyingRequest} />
          {!!br?.gallery?.length && (
            <div className="relative border rounded-md h-56 w-full overflow-hidden">
              <Image src={br.gallery[0]?.location || ""} layout="fill" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BuyingRequestDetails.Layout = PageLayout;

export default BuyingRequestDetails;
