import { useProjectsQuery } from "@graphql/project.graphql";
import { IProject } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SelectProject from "./select-project";

interface IAddToProjectProps {
  onNewClick: () => void;
  onProjectClick: (project: IProject) => void;
  brId?: string;
}

const AddToProject: React.FC<IAddToProjectProps> = ({
  onNewClick,
  brId,
  onProjectClick,
}) => {
  const { t } = useTranslation("common");

  const { data, refetch } = useProjectsQuery({
    variables: { companyId: getCompanyId(), offset: 0 },
  });
  const projects = data?.projects?.projects || [];

  useEffect(() => {
    refetch({ companyId: getCompanyId(), offset: 0 });
  }, [refetch]);

  return (
    <SelectProject
      loading={false}
      onNewClick={onNewClick}
      onProjectClick={onProjectClick}
      projects={projects}
      brId={brId}
      title={t("move-to-project-title")}
      createNewLabel={t("create-new-label")}
      noProjectMessage={t("no-project-yet-message")}
    />
  );
};
export default AddToProject;
