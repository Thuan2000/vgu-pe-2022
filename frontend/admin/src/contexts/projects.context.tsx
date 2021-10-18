import { IProject } from "@graphql/types.graphql";
import React, { useContext, useMemo, useState } from "react";

type ProjectContextType = {
  selectedProjects: Array<IProject>;
  setSelectedProjects: (projects: IProject[]) => void;
};

const initValue = {
  selectedProjects: [],
  setSelectedProjects: (data: IProject[]) => console.log(data),
};

const ProjectContext = React.createContext<ProjectContextType>(initValue);

const ProjectContextProvider: React.FC = ({ children }) => {
  const [selectedProjects, setSelectedProjects] = useState<IProject[]>([]);

  const value = useMemo(() => {
    return { selectedProjects, setSelectedProjects };
  }, [selectedProjects]);

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectContextProvider;

export const useProjects = () => {
  const ctx = useContext(ProjectContext);

  if (!ctx) throw "Please use project context inside project context provider";

  return ctx;
};
