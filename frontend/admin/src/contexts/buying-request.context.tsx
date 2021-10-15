import { IBuyingRequest } from "@graphql/types.graphql";
import React, { useContext, useMemo, useState } from "react";

type BRContext = {
  selecteds: IBuyingRequest[];
  isCreatingProject: boolean;
  setSelecteds: (br: IBuyingRequest[]) => void;
  openCreateProject: () => void;
  closeCreateProject: () => void;
  shouldRefetchBrs: boolean;
  refetchBrs: () => void;
};

const initVal: BRContext = {
  selecteds: [],
  isCreatingProject: false,
  setSelecteds: (value) => console.log("new selected prs ", value),
  openCreateProject: () => console.log("new selected prs "),
  closeCreateProject: () => console.log("new selected prs "),
  shouldRefetchBrs: false,
  refetchBrs: () => console.log("Refetching Br"),
};

const BuyingRequestsContext = React.createContext<BRContext>(initVal);

export const BuyingRequestContextProvider: React.FC = ({ children }) => {
  const [selecteds, setSelecteds] = useState<IBuyingRequest[]>([]);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [shouldRefetchBrs, setShouldRefetchBrs] = useState(false);

  const value = useMemo(() => {
    function refetchBrs() {
      setShouldRefetchBrs(!shouldRefetchBrs);
    }
    function openCreateProject() {
      setIsCreatingProject(true);
    }
    function closeCreateProject() {
      setIsCreatingProject(false);
    }

    return {
      selecteds,
      setSelecteds,
      isCreatingProject,
      openCreateProject,
      shouldRefetchBrs,
      refetchBrs,
      closeCreateProject,
    };
  }, [isCreatingProject, selecteds, shouldRefetchBrs]);

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
