import React, { useContext, useMemo, useState } from "react";

type BRContext = {
  selecteds: number[];
  setSelecteds: (number: []) => void;
};

const initVal: BRContext = {
  selecteds: [],
  setSelecteds: (value) => console.log("new selected prs ", value),
};

const BuyingRequestsContext = React.createContext<BRContext>(initVal);

export const BuyingRequestContextProvider: React.FC = ({ children }) => {
  const [selecteds, setSelecteds] = useState<number[]>([]);

  const value = useMemo(() => ({ selecteds, setSelecteds }), [selecteds]);
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
