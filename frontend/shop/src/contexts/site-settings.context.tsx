import React, { useContext, useEffect, useMemo, useState } from "react";

type TSiteSettings = {
  siteEnv: "dev" | "prod";
};

const SiteSettingsContext = React.createContext<TSiteSettings>({
  siteEnv: "prod",
});

export const SiteSettingsProvider: React.FC<any> = ({ children }) => {
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  const isDev = hostname.includes("dev") || hostname.includes("localhost");
  const value = useMemo<TSiteSettings>(() => {
    return {
      siteEnv: isDev ? "dev" : "prod",
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostname]);

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);

  if (context === undefined) throw "Please wrap this on Site Settings Provider";

  return context;
};
