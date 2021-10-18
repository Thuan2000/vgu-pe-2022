import { IBuyingRequest, IProject } from "@graphql/types.graphql";
import React, { useContext, useMemo, useState } from "react";

type BRContext = {
  selecteds: IBuyingRequest[];
  isCreatingProject: boolean;
  setSelecteds: (br: IBuyingRequest[]) => void;
  openCreateProject: () => void;
  openUpdateProject: (project: IProject) => void;
  closeCreateProject: () => void;
  shouldRefetchBrs: boolean;
  projectInitValue?: IProject | null;
  refetchBrs: () => void;
};

const initVal: BRContext = {
  selecteds: [],
  isCreatingProject: false,
  setSelecteds: (value) => console.log("new selected prs ", value),
  openCreateProject: () => console.log("new selected prs "),
  openUpdateProject: () => console.log("new selected prs "),
  closeCreateProject: () => console.log("new selected prs "),
  shouldRefetchBrs: false,
  refetchBrs: () => console.log("Refetching Br"),
};

const BuyingRequestsContext = React.createContext<BRContext>(initVal);

export const BuyingRequestContextProvider: React.FC = ({ children }) => {
  const [selecteds, setSelecteds] = useState<IBuyingRequest[]>([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [shouldRefetchBrs, setShouldRefetchBrs] = useState(false);
  const [projectInitValue, setProjectInitValue] = useState<IProject | null>();

  const value = useMemo(() => {
    function refetchBrs() {
      setShouldRefetchBrs(!shouldRefetchBrs);
    }

    function openCreateProject() {
      setIsCreatingProject(true);
    }

    function openUpdateProject(initVal: IProject) {
      setIsCreatingProject(true);
      setProjectInitValue(initVal);
    }

    function closeCreateProject() {
      setIsCreatingProject(false);
      setProjectInitValue(null);
    }

    return {
      selecteds,
      setSelecteds,
      isCreatingProject,
      openCreateProject,
      shouldRefetchBrs,
      refetchBrs,
      projectInitValue,
      closeCreateProject,
      openUpdateProject,
    };
  }, [isCreatingProject, selecteds, shouldRefetchBrs, projectInitValue]);

  return (
    <BuyingRequestsContext.Provider value={value}>
      {children}
    </BuyingRequestsContext.Provider>
  );
};

export const useBRContext = () => {
  const context = useContext(BuyingRequestsContext);

  if (context === undefined)
    throw "please use 'useSelectedBrs' inside BRContext Provider";

  return context;
};
