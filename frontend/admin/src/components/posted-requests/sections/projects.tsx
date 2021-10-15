import UnderDevelopment from "@components/under-development";
import React from "react";
import ProjectCard from "../projects/project-card";

interface IProjectsProps extends React.HTMLAttributes<HTMLDivElement> {}

const Projects: React.FC<IProjectsProps> = ({ className, ...props }) => {
  return (
    <div>
      {/* <ProjectCard /> */}
      <UnderDevelopment />
    </div>
  );
};
export default Projects;
