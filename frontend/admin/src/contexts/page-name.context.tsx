import React, { useState, useMemo } from "react";

type IPageNameContext = {
  pageName: string;
};

export const PageNameContext = React.createContext<IPageNameContext | any>({
  pageName: "",
});

PageNameContext.displayName = "PageNameContext";

const PageNameProvider: React.FC = ({ children }) => {
  const [pageName, setPageName] = useState("");

  const value = useMemo(
    () => ({
      pageName,
      setPageName,
    }),
    [pageName]
  );

  if (pageName === "homepage-page-name") console.log("mantul");

  return (
    <PageNameContext.Provider value={value}>
      {children}
    </PageNameContext.Provider>
  );
};

export const usePageName = () => {
  const context = React.useContext(PageNameContext);
  if (context === undefined) {
    throw new Error(`usePageName must be used within a PageNameProvider`);
  }
  return context;
};

export default PageNameProvider;
