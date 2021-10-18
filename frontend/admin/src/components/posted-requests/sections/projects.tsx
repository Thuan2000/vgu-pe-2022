import UnderDevelopment from "@components/under-development";
import { useProjectsQuery } from "@graphql/project.graphql";
import { IProject } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";
import React from "react";
import ProjectContextProvider from "src/contexts/projects.context";
import NoProjects from "../no-projects";
import ProjectCard from "../projects/project-card";

const Projects: React.FC = () => {
  const { data, refetch } = useProjectsQuery({
    variables: { companyId: getCompanyId(), offset: getOffset() },
  });

  function refetchProject() {
    refetch({ companyId: getCompanyId(), offset: getOffset() });
  }

  function getOffset() {
    return 0;
  }

  const projects = data?.projects.projects;

  if (!projects) return <NoProjects />;

  const projectList = projects?.map((project) => {
    return (
      <ProjectCard
        project={project as IProject}
        reFetchProject={refetchProject}
        key={project?.id + "-Project"}
      />
    );
  });

  return (
    <ProjectContextProvider>
      <div className="flex flex-wrap justify-between mx-5">{projectList}</div>
    </ProjectContextProvider>
  );
};
export default Projects;
