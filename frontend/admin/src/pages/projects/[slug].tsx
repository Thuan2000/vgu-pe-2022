import React from "react";
import Image from "next/image";
import PageLayout from "@components/layouts/page-layout";
import Typography from "@components/ui/storybook/typography";
import { useProjectQuery } from "@graphql/project.graphql";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "react-i18next";
import { viDateFormat } from "@utils/functions";
import { useGetBuyingRequestsByIdsQuery } from "@graphql/buying-request.graphql";
import Checkbox from "@components/ui/storybook/checkbox";
import Button from "@components/ui/storybook/button";
import BuyingRequestCard from "@components/posted-requests/buying-request/buying-request-card";
import { IBuyingRequest } from "@graphql/types.graphql";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, locale } = ctx;

  return {
    props: {
      slug: params?.slug,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const ProjectDetails = ({ slug }: { slug: string }) => {
  const { t } = useTranslation();
  const { data, loading } = useProjectQuery({
    variables: { slug },
  });

  const {
    name,
    endDate,
    image,
    description,
    buyingRequests: projectBrs,
  } = data?.project.project || {};

  const brIds = projectBrs?.map((br) => br.id);

  const { data: brData } = useGetBuyingRequestsByIdsQuery({
    variables: { ids: brIds as number[] },
  });

  const buyingRequests = brData?.getBuyingRequestsByIds;

  const createdBy = data?.project.createdBy;

  return (
    <div className="py-4 bg-white overflow-hidden">
      <div className="border-b px-4 pb-5 border-gray-10 space-y-1">
        <div>
          <Typography element="h3" text={name || ""} className="text-lg" />
          <div className="flex items-center space-x-2">
            <Typography text={`${t("createdBy-text")}:`} variant="question" />
            <Typography
              variant="smallTitle"
              text={`${createdBy?.firstName} ${createdBy?.lastName}`}
            />
          </div>
        </div>
        <div className="relative w-full h-[150px] overflow-hidden rounded-sm shadow-sm">
          <Image
            src={image?.location || siteSettings.logo.url}
            layout="fill"
            alt="project-preview"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Typography text={`${t("endDate-text")}:`} variant={"question"} />
          <Typography text={viDateFormat(endDate)} variant="date" />
        </div>
        <Typography
          variant="smallTitle"
          text={`${projectBrs?.length} ${t(
            projectBrs?.length && projectBrs?.length > 1
              ? "plurarRequest-text"
              : "singularRequest-text"
          )}`}
        />
        <Typography
          variant="description"
          text={description || t("noDescription-text")}
        />
      </div>
      <div className="px-4 pt-5 space-y-5">
        <div className="flex items-center justify-between sm:justify-end sm:space-x-5">
          <Checkbox
            name="select-all"
            label={t("select-all-label")}
            title={t("slect-all")}
            className="text-gray w-1/2.5 sm:w-40 flex-center text-sm font-semibold py-2 border-2 border-gray-100 rounded-sm"
          />
          <Button className="w-1/2.5 sm:w-40">
            {t("addRequest-button-label")}
          </Button>
        </div>
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row flex-wrap sm:justify-between">
          {buyingRequests?.map((br) => {
            return (
              <BuyingRequestCard
                key={br?.id + "project-br-list"}
                br={br as IBuyingRequest}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

ProjectDetails.Layout = PageLayout;

export default ProjectDetails;
