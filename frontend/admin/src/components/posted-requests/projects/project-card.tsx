import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import Checkbox from "@components/ui/storybook/checkbox";
import { IProject } from "@graphql/types.graphql";
import { trimText, viDateFormat } from "@utils/functions";
import { useTranslation } from "react-i18next";
import ThreeDotIcon from "@assets/icons/three-dot-icon";
import { COLORS } from "@utils/colors";
import { PlusIcon } from "@assets/icons/plus-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { useModal } from "src/contexts/modal.context";
import DeleteProjectAlert from "@components/ui/delete-project-alert";
import { useDeleteProjectMutation } from "@graphql/project.graphql";
import useIsPhone from "src/hooks/isPhone.hook";
import { useProjects } from "src/contexts/projects.context";
import { findIndex, remove } from "lodash";
import { useRouter } from "next/dist/client/router";

interface IProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: IProject;
  reFetchProject: () => void;
}

const ProjectCard: React.FC<IProjectCardProps> = ({
  project,
  reFetchProject,
}) => {
  const { t } = useTranslation("common");
  const { query, ...router } = useRouter();
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const { openModal } = useModal();
  const isPhone = useIsPhone();
  const { selectedProjects, setSelectedProjects } = useProjects();
  const [deleteProject, { loading: deleteLoading }] = useDeleteProjectMutation({
    onCompleted: reFetchProject,
  });

  function projectIndexOnSelecteds() {
    return findIndex(selectedProjects, (sp) => sp.id === project.id);
  }

  const isSelected = projectIndexOnSelecteds() !== -1;

  function removeProjectFromSelecteds() {
    const idx = projectIndexOnSelecteds();

    if (idx === -1) return;

    remove(selectedProjects, project);
    setSelectedProjects([...selectedProjects]);
  }

  function addToSPs() {
    const idx = projectIndexOnSelecteds();
    if (idx !== -1) return;

    setSelectedProjects([...selectedProjects, project]);
  }

  function hanldeAddRequestClick() {
    const { pathname } = router;

    router.push({
      pathname,
      query: { ...query, projectId: project.id },
    });
  }

  function handleSelectChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) addToSPs();
    if (!e.target.checked) removeProjectFromSelecteds();
  }

  function onDelete() {
    deleteProject({ variables: { id: project.id } });
  }

  function handleDeleteProject() {
    openModal(
      (
        <DeleteProjectAlert
          isLoading={deleteLoading}
          onDeleteClick={onDelete}
        />
      ) as any
    );
  }

  return (
    <div
      className={`border rounded-md shadow-md flex w-full relative max-h-44 sm:w-49p flex-grow-0 mt-5 
      ${isSelected && "bg-primary bg-opacity-20"}
    `}
    >
      <div className="absolute left-4 top-4 z-20">
        <Checkbox
          name={`${project.id}${project.name}`}
          className="z-10"
          onChange={handleSelectChange}
          checked={isSelected}
          // checked={isSelected}
        />
      </div>
      <button
        className="absolute right-4 top-4"
        onClick={() => setShowProjectMenu(!showProjectMenu)}
        onBlur={() => setShowProjectMenu(false)}
      >
        <ThreeDotIcon />
        {showProjectMenu && (
          <div
            className={`border min-w-[215px] bg-white absolute right-0 z-50 rounded-md`}
          >
            <ul>
              <li className="border-b border-gray-100">
                <div
                  className="pl-7 flex py-4 items-center w-full h-full"
                  onClick={hanldeAddRequestClick}
                >
                  <PlusIcon className="ml-1 mr-4" stroke={COLORS.GRAY[200]} />
                  {t("addRequest-button-label")}
                </div>
              </li>
              <li>
                <div
                  className="pl-7 py-4 flex items-center w-full h-full"
                  onClick={handleDeleteProject}
                >
                  <TrashCanIcon className="mr-3" />
                  {t("delete-button-label")}
                </div>
              </li>
            </ul>
          </div>
        )}
      </button>
      <div className="relative w-[165px] h-[170px] flex-shrink-0">
        <Image
          src={project?.image?.location || siteSettings.logo.url}
          layout="fill"
          alt="project-card-image"
        />
      </div>
      <div className="py-3 ml-3 space-y-1">
        <p className="font-semibold text-md">
          {trimText(project.name, isPhone ? 19 : 30)}
        </p>
        <p>
          <span className="text-gray-200">{t("due-time-text")}:</span>
          <span className="ml-2 text-secondary-1">
            {viDateFormat(project.endDate)}
          </span>
        </p>
        <div className="flex items-center">
          <div className="flex items-center">
            {project.buyingRequests.slice(0, 5).map((projectBr, idx) => {
              const isFirst = idx === 0;
              const isLast =
                project.buyingRequests.length - 1 === idx || idx + 1 === 5;
              return (
                <div
                  className={`relative w-9 h-9 overflow-hidden rounded-sm
                    ${!isLast && "border-r-4 border-white"}
                    ${!isFirst && "-translate-x-2"}
                  `}
                  style={{ zIndex: 50 - idx }}
                  key={projectBr.id + "project-br"}
                >
                  <Image
                    layout="fill"
                    alt={projectBr.id + "cover"}
                    src={projectBr?.cover || siteSettings.placeholderImage}
                  />
                </div>
              );
            })}
          </div>
          {project?.buyingRequests?.length > 5 && (
            <p className="text-gray-200 text-sm ml-4">
              +{project.buyingRequests.length - 5} {t("requests-text")}
            </p>
          )}
        </div>
        <p className="text-gray-200 text-sm sm:text-md px-1">
          {trimText(project.description as string, isPhone ? 60 : 75)}
        </p>
      </div>
    </div>
  );
};
export default ProjectCard;
