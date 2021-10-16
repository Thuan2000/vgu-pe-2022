import { useProjectsQuery } from "@graphql/project.graphql";
import { IProject } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";
import React from "react";
import { useTranslation } from "react-i18next";
import { useBRContext } from "src/contexts/buying-request.context";
import SelectProject from "./select-project";

interface IAddToProjectProps {
  onNewClick: () => void;
  onProjectClick: (project: IProject) => void;
}

const AddToProject: React.FC<IAddToProjectProps> = ({
  onNewClick,
  onProjectClick,
}) => {
  const { t } = useTranslation("common");

  const { data } = useProjectsQuery({
    variables: { companyId: getCompanyId(), offset: 0 },
  });
  const projects = data?.projects?.projects || [];

  return (
    <SelectProject
      loading={false}
      onNewClick={onNewClick}
      onProjectClick={onProjectClick}
      projects={projects}
      title={t("move-to-project-title")}
      createNewLabel={t("create-new-label")}
      noProjectMessage={t("no-project-yet-message")}
    />
  );
};
export default AddToProject;
