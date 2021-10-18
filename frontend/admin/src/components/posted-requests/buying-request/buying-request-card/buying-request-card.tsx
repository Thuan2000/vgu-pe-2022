import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { IBuyingRequest, IProject } from "@graphql/types.graphql";
import { useTranslation } from "react-i18next";
import BRCGeneralInfo from "./brc-general-info";
import Checkbox from "@components/ui/storybook/checkbox";
import { siteSettings } from "@settings/site.settings";
import BrcExtras from "./brc-extras";
import BRCExternalInfo from "./brc-external-info";
import { useBRContext } from "src/contexts/buying-request.context";
import { findIndex, indexOf, remove } from "lodash";
import {
  useDeleteBuyingRequestMutation,
  useDeleteBuyingRequestsMutation,
} from "@graphql/buying-request.graphql";
import { useModal } from "src/contexts/modal.context";
import DeleteBrAlert from "@components/ui/delete-br-alert";
import SelectProject from "@components/ui/select-project";
import AddToProject from "@components/ui/add-to-project";
import UnderDevelopment from "@components/under-development";
import {
  useAddToProjectMutation,
  useProjectsQuery,
} from "@graphql/project.graphql";
import { getCompanyId } from "@utils/functions";

interface IBuyingRequestCardProps extends React.HTMLAttributes<HTMLDivElement> {
  br: IBuyingRequest;
  onSelectChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selecteds: IBuyingRequest[];
  setSelecteds: (value: IBuyingRequest[]) => void;
}

const BuyingRequestCard: React.FC<IBuyingRequestCardProps> = ({
  br,
  className,
  onSelectChange,
  selecteds,
  setSelecteds,
  ...props
}) => {
  const { t } = useTranslation();
  const { refetchBrs, openCreateProject } = useBRContext();
  const [isSelected, setIsSelected] = useState(false);
  const { openModal, closeModal } = useModal();

  const [deleteBr, { loading: deleteLoading }] =
    useDeleteBuyingRequestMutation();

  useEffect(() => {
    const indexOnSelecteds = findIndex(
      selecteds,
      (selected) => selected.id === br.id
    );
    const isSelected =
      indexOnSelecteds !== -1 &&
      !(selecteds?.at(indexOnSelecteds) as any)?.unChecked === true;

    setIsSelected(isSelected);
  }, [br.id, selecteds]);

  function handleCreateProject() {
    openCreateProject();
    closeModal();
  }

  function handleProjectClick(project: IProject) {}

  function handleAddToProject() {
    setSelecteds([br]);
    openModal(
      (
        <AddToProject
          brId={br.id}
          onNewClick={handleCreateProject}
          onProjectClick={handleProjectClick}
        />
      ) as any
    );
  }

  async function onDelete() {
    await deleteBr({ variables: { id: parseInt(br.id) } });
    refetchBrs();
  }

  function handleDeleteBrClick() {
    openModal(
      (
        <DeleteBrAlert isLoading={deleteLoading} onDeleteClick={onDelete} />
      ) as any
    );
  }

  return (
    <div
      className={`border rounded-md shadow-md flex relative md:w-49p max-h-44
          ${
            isSelected ? "bg-primary bg-opacity-20 border-primary" : "bg-white"
          } 
          ${className} 
        `}
      {...props}
    >
      <div className="absolute left-4 top-4 z-20">
        <Checkbox
          name={`${br.id}${br.name}`}
          className="z-10"
          onChange={onSelectChange}
          checked={isSelected}
        />
      </div>
      <div className="relative w-32 md:w-40 flex-center flex-shrink-0">
        <Image
          src={br.gallery?.at(0)?.location || siteSettings?.logo?.url}
          alt={br.name}
          className="m-5 rounded-l-md"
          layout="fill"
        />
      </div>
      <div className="ml-2 md:ml-5 py-4 w-full">
        <BRCGeneralInfo
          name={br.name}
          minOrder={br.minOrder}
          status={br.status}
          location={br.location}
          unit={br.unit}
          slug={br.slug}
        />
        <BRCExternalInfo
          className="my-2"
          bidsCount={br.bidIds?.length || 0}
          projectsCount={br.projectIds?.length || 0}
          commentsCount={br.commentIds?.length || 0}
        />
        <BrcExtras
          brId={parseInt(br.id)}
          updatedAt={br.updatedAt}
          onAddToProjectClick={handleAddToProject}
          onDeleteClick={handleDeleteBrClick}
          postedTextLabel={t("posted-label")}
          deleteButtonLabel={t("delete-button-label")}
          addToProjectButtonLabel={t("addToProject-button-label")}
        />
      </div>
    </div>
  );
};
export default BuyingRequestCard;
