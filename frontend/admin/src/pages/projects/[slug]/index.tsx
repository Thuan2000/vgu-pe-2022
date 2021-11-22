import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import PageLayout from "@components/layouts/page-layout";
import Typography from "@components/ui/storybook/typography";
import {
  useDeleteProjectsMutation,
  useProjectQuery,
  useUpdateBuyingRequestsMutation,
} from "@graphql/project.graphql";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "react-i18next";
import { viDateFormat } from "@utils/functions";
import Checkbox from "@components/ui/storybook/checkbox";
import Button from "@components/ui/storybook/button";
import BuyingRequestCard from "@components/posted-tenders/buying-request/buying-request-card";
import { IBuyingRequest } from "@graphql/types.graphql";
import { IExtraMenu as IBRCardExtraMenu } from "@components/posted-tenders/buying-request/buying-request-card/buying-request-card";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { findIndex, remove } from "lodash";
import CircleDashIcon from "@assets/icons/circle-dash-icon";
import { COLORS } from "@utils/colors";
import DocumentAddIcon from "@assets/icons/document-add-icon";
import Loading from "@components/ui/loading";
import Swal from "sweetalert2";
import { useModal } from "src/contexts/modal.context";
import DeleteBrAlert from "@components/ui/delete-br-alert";
import { useRouter } from "next/dist/client/router";
import { ROUTES } from "@utils/routes";

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
  const { openModal } = useModal();
  const router = useRouter();
  const {
    data,
    loading: fetching,
    refetch,
  } = useProjectQuery({
    variables: { slug },
  });
  const [selectedBrs, setSelectedBrs] = useState<IBuyingRequest[]>([]);
  const [deleteProject, { loading: deletingProject }] =
    useDeleteProjectsMutation({
      onCompleted: handleProjectDeleted,
    });
  const [updatedProjectBrs, { loading: removing }] =
    useUpdateBuyingRequestsMutation({
      onCompleted: handleRemovedBrs,
    });

  async function handleProjectDeleted() {
    setSelectedBrs([]);

    const data = await Swal.fire({
      icon: "success",
      title: t("projectDeleted-title"),
      text: t("projectDeleted-text"),
      confirmButtonText: t("projectDeleted-button-label"),
    });

    router.replace(ROUTES.POSTED_REQUESTS);
  }

  if (!data?.project || fetching) return <Loading />;

  const {
    name,
    endDate,
    image,
    description,
    id,
    buyingRequests,
    createdBy,
    updatedBy,
  } = data?.project || {};

  function handleRemovedBrs() {
    setSelectedBrs([]);
    refetch({ slug });

    Swal.fire({
      icon: "success",
      title: t("projectDeleted-title"),
      text: t("projectDeleted-text"),
      confirmButtonText: t("projectDeleted-button-label"),
    });
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
    if (e.target.checked)
      setSelectedBrs([...buyingRequests] as IBuyingRequest[]);
    else setSelectedBrs([]);
  }

  function showDeleteBrAlert() {
    openModal(
      (
        <DeleteBrAlert
          isLoading={removing || deletingProject}
          onDeleteClick={deleteSelectedBrs}
        />
      ) as any
    );
  }

  function deleteSelectedBrs() {
    // The selected br will be removed, then we filter all of it
    const toRemoved = new Set(selectedBrs);
    const undeletedBrs = buyingRequests?.filter(
      (x) => !toRemoved.has(x as any)
    );

    if (undeletedBrs.length === 0) {
      deleteProject({ variables: { ids: id } });
    }

    const newBrIds = undeletedBrs?.map((br) => parseInt(br.id));

    if (newBrIds) updatedProjectBrs({ variables: { id, brIds: newBrIds } });
  }

  function handleBrRemoveFromProject(br: IBuyingRequest) {
    // const idx = buyingRequests.findIndex((sbr) => sbr.id === br.id);
    setSelectedBrs([br]);
    showDeleteBrAlert();
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
    <div className="py-4 bg-white overflow-hidden pb-14">
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
          {updatedBy && (
            <div className="flex items-center space-x-2">
              <Typography text={`${t("createdBy-text")}:`} variant="question" />
              <Typography
                variant="smallTitle"
                text={`${updatedBy?.firstName} ${updatedBy?.lastName}`}
              />
            </div>
          )}
        </div>

        <div className="sm:flex space-x-4">
          <div className="relative w-full h-[150px] sm:w-[150px] overflow-hidden rounded-sm shadow-sm">
            <Image
              src={image?.location || siteSettings.logo.url}
              layout="fill"
              alt="project-preview"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Typography text={`${t("endDate-text")}:`} variant={"question"} />
              <Typography text={viDateFormat(endDate)} variant="date" />
            </div>
            <Typography
              variant="smallTitle"
              text={`${buyingRequests?.length} ${t(
                buyingRequests?.length && buyingRequests?.length > 1
                  ? "plurarRequest-text"
                  : "singularRequest-text"
              )}`}
            />
            <Typography
              variant="description"
              text={description || t("noDescription-text")}
            />
          </div>
        </div>
      </div>
      <div className="px-4 pt-5 space-y-5">
        <div className="flex items-center justify-between sm:justify-end sm:space-x-5">
          <Checkbox
            name="select-all"
            label={t("select-all-label")}
            title={t("slect-all")}
            onChange={handleSelectAllChange}
            checked={buyingRequests.length === selectedBrs.length}
            className="text-gray w-1/2.5 sm:w-40 flex-center text-sm font-semibold py-2 border-2 border-gray-100 rounded-sm"
          />
          {selectedBrs.length > 0 ? (
            <Button
              loading={removing}
              className="w-1/2.5 sm:w-40"
              style={{ backgroundColor: COLORS.ERROR }}
              onClick={showDeleteBrAlert}
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
