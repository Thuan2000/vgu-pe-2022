import DeleteProjectAlert from "@components/ui/delete-project-alert";
import {
  DeleteProjectsMutation,
  useDeleteProjectsMutation,
  useProjectsQuery,
} from "@graphql/project.graphql";
import { IBuyingRequest, IProject } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";
import { findIndex, remove } from "lodash";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useModal } from "src/contexts/modal.context";
import Swal from "sweetalert2";
import NoProjects from "../no-projects";
import ProjectCard from "../projects/project-card";
import ProjectsHeader from "../projects/projects-header/projects-header";

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const { data, refetch } = useProjectsQuery({
    variables: { companyId: getCompanyId(), offset: getOffset() },
  });
  const [deleteProjects, { loading: deleting }] = useDeleteProjectsMutation({
    onCompleted: handleDeleteprojectsCompleted,
  });

  const { openModal } = useModal();

  const [selectedProjects, setSelectedProjects] = useState<IProject[]>([]);

  function refetchProject() {
    refetch({ companyId: getCompanyId(), offset: getOffset() });
  }

  function handleDeleteprojectsCompleted({
    deleteProjects,
  }: DeleteProjectsMutation) {
    const { message, success } = deleteProjects;

    if (success === true) {
      refetchProject();
      setSelectedProjects([]);
    } else if (success === false) {
      alert(`PROJECT_${message}_ERROR`);
    }
  }

  useEffect(() => {
    refetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getOffset() {
    return 0;
  }

  const projects = data?.projects.projects;

  if (!projects?.length) return <NoProjects />;

  function handleSelectAllChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setSelectedProjects(projects as IProject[]);
    else setSelectedProjects([]);
  }

  function handleOnProjectSelect(
    e: ChangeEvent<HTMLInputElement>,
    project: IProject
  ) {
    if (e.target.checked) setSelectedProjects([...selectedProjects, project]);
    else {
      const newSelecteds = selectedProjects.filter(
        (sp) => sp.id !== project.id
      );
      setSelectedProjects([...newSelecteds]);
    }
  }

  function projectIndexOnSelecteds(project: IProject) {
    return findIndex(selectedProjects, (sp) => sp.id === project.id);
  }

  function onDeleteProjects() {
    const projectIds = selectedProjects.map((sp) => sp.id);

    deleteProjects({ variables: { ids: projectIds } });
  }

  function handleDeleteProjects() {
    openModal(
      (
        <DeleteProjectAlert
          isLoading={deleting}
          onDeleteClick={onDeleteProjects}
        />
      ) as any
    );
  }

  return (
    <div className="w-full">
      <ProjectsHeader
        isSelecting={selectedProjects.length > 0}
        onDeleteProjects={handleDeleteProjects}
        isCheckedSelectAll={selectedProjects.length === projects.length}
        onSelectChange={handleSelectAllChange}
        deleting={deleting}
      />
      <div className="mx-4 sm:flex flex-wrap justify-between">
        {projects?.map((project) => {
          return (
            <ProjectCard
              isSelected={projectIndexOnSelecteds(project as IProject) !== -1}
              project={project as IProject}
              onProjectSelect={(e) =>
                handleOnProjectSelect(e, project as IProject)
              }
              reFetchProject={refetchProject}
              key={project?.id + "-Project"}
              className="mx-5"
            />
          );
        })}
      </div>
    </div>
  );
};
export default Projects;
