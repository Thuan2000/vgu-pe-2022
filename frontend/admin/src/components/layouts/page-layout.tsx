import React, { useEffect } from "react";
import Sidebar from "@components/ui/sidebar";
import AdminNavbar from "@components/admin-navbar";
import { getMeData } from "@utils/auth-utils";
import { useRouter } from "next/dist/client/router";
import { PAGE_NAME } from "@utils/constants";
import { useTranslation } from "react-i18next";
import { usePageName } from "src/contexts/page-name.context";

const PageLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const { user } = getMeData();
  const { pathname, ...router } = useRouter();
  const { setPageName } = usePageName();
  // Just do console.log(children) everything will show up this is why
  // every page compoent has this PageComponent.PageName = {pagename}
  const childrenPageName = (children as any)?.type?.PageName;

  function handleBackClick() {
    router.back();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPageName(childrenPageName), [childrenPageName]);

  return (
    <div className="flex bg-light-300">
      <Sidebar className="hidden md:block flex-shrink-0" />
      <main className="md:mx-8 w-full">
        <AdminNavbar
          // `/` (Homepage) => has no split[1]
          // !! mean not empty use for boolean
          showBackArrow={!!pathname.split("/")[1]}
          onBackClick={handleBackClick}
          userName={user?.firstName || ""}
          userRole={user?.role || ""}
        />
        {children}
      </main>
    </div>
  );
};
export default PageLayout;
