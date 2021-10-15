import { IBuyingRequest } from "@graphql/types.graphql";
import React, { useContext, useMemo, useState } from "react";

type BRContext = {
  selecteds: IBuyingRequest[];
  isCreatingProject: boolean;
  setSelecteds: (br: IBuyingRequest[]) => void;
  openCreateProject: () => void;
  closeCreateProject: () => void;
};

const initVal: BRContext = {
  selecteds: [],
  isCreatingProject: false,
  setSelecteds: (value) => console.log("new selected prs ", value),
  openCreateProject: () => console.log("new selected prs "),
  closeCreateProject: () => console.log("new selected prs "),
};

const BuyingRequestsContext = React.createContext<BRContext>(initVal);

export const BuyingRequestContextProvider: React.FC = ({ children }) => {
  const [selecteds, setSelecteds] = useState<IBuyingRequest[]>([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  function openCreateProject() {
    setIsCreatingProject(true);
  }
  function closeCreateProject() {
    setIsCreatingProject(false);
  }

  const value = useMemo(
    () => ({
      selecteds,
      setSelecteds,
      isCreatingProject,
      openCreateProject,
      closeCreateProject,
    }),
    [isCreatingProject, selecteds]
  );
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
