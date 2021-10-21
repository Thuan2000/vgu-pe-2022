import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import PageLayout from "@components/layouts/page-layout";
import Typography from "@components/ui/storybook/typography";
import {
  RemoveRequestFromProjectMutation,
  useProjectQuery,
  useRemoveRequestFromProjectMutation,
} from "@graphql/project.graphql";
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
import { IExtraMenu as IBRCardExtraMenu } from "@components/posted-requests/buying-request/buying-request-card/buying-request-card";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { findIndex, remove } from "lodash";
import RemoveIcon from "@assets/icons/remove-icon";
import CircleDashIcon from "@assets/icons/circle-dash-icon";
import { COLORS } from "@utils/colors";
import DocumentAddIcon from "@assets/icons/document-add-icon";

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
  const { data, loading: fetching } = useProjectQuery({
    variables: { slug },
  });

  const {
    name,
    endDate,
    image,
    description,
    id,
    buyingRequests: projectBrs,
  } = data?.project.project || {};

  const brIds = projectBrs?.map((br) => br.id);
  console.log(brIds);
  const { data: brData, refetch } = useGetBuyingRequestsByIdsQuery({
    variables: { ids: brIds as number[] },
  });
  const [selectedBrs, setSelectedBrs] = useState<IBuyingRequest[]>([]);
  const [removeRequest, { loading: removing }] =
    useRemoveRequestFromProjectMutation({
      onCompleted: onRemovedBrs,
    });

  const buyingRequests = brData?.getBuyingRequestsByIds;
  const createdBy = data?.project.createdBy;

  function onRemovedBrs({
    removeRequestFromProject,
  }: RemoveRequestFromProjectMutation) {
    const { message, success } = removeRequestFromProject;
    console.log(message, success);
    if (success) {
      refetch({ ids: brIds });
    } else if (success === false) {
      alert(`ERROR-${message}`);
    }
  }

  function handleBRCardSelectChange(
    e: ChangeEvent<HTMLInputElement>,
    br?: IBuyingRequest
  ) {
    if (!br) return;

    if (e.target.checked) setSelectedBrs([...selectedBrs, br]);
    else {
      remove(selectedBrs, (sb) => sb.id === br.id);

      setSelectedBrs([...selectedBrs]);
    }
  }

  function handleSelectAllChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setSelectedBrs(buyingRequests as IBuyingRequest[]);
    else setSelectedBrs([]);
  }

  function deleteSelectedBrs() {
    const brIds = selectedBrs.map((sbr) => parseInt(sbr.id));

    removeRequest({ variables: { id: id as number, brIds } });
  }

  function handleBrRemoveFromProject(br: IBuyingRequest) {
    console.log(br);
  }

  const buyingRequestCardExtraMenu: IBRCardExtraMenu[] = [
    {
      label: t("delete-button-label"),
      icon: TrashCanIcon,
      onClick: handleBrRemoveFromProject,
    },
  ];

  function isSelectedBr(br: IBuyingRequest) {
    const indexOnSelecteds = findIndex(
      selectedBrs,
      (selected) => selected.id === br.id
    );
    const isSelected =
      indexOnSelecteds !== -1 &&
      !(selectedBrs?.at(indexOnSelecteds) as any)?.unChecked === true;

    return isSelected;
  }

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
            onChange={handleSelectAllChange}
            className="text-gray w-1/2.5 sm:w-40 flex-center text-sm font-semibold py-2 border-2 border-gray-100 rounded-sm"
          />
          {selectedBrs.length > 0 ? (
            <Button
              loading={removing}
              className="w-1/2.5 sm:w-40"
              style={{ backgroundColor: COLORS.ERROR }}
              onClick={deleteSelectedBrs}
            >
              <CircleDashIcon fill={COLORS.WHITE} className="w-4 mr-1" />
              {t(
                selectedBrs.length === 1
                  ? "removeRequestSingular-button-label"
                  : "removeRequestPlurar-button-label"
              )}
            </Button>
          ) : (
            <Button className="w-1/2.5 sm:w-40">
              <DocumentAddIcon className="w-4 mr-1" />
              {t("addRequest-button-label")}
            </Button>
          )}
        </div>
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row flex-wrap sm:justify-between">
          {buyingRequests?.map((br) => {
            return (
              <BuyingRequestCard
                isSelected={isSelectedBr(br as IBuyingRequest)}
                extraMenus={buyingRequestCardExtraMenu}
                onSelectChange={handleBRCardSelectChange}
                key={br?.id + "project-br-list"}
                br={br as IBuyingRequest}
                postedTextLabel={t("posted-label")}
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
