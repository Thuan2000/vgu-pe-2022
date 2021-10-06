import React from "react";
import Sidebar from "@components/ui/sidebar";
import AdminNavbar from "@components/admin-navbar";
import { getMeData } from "@utils/auth-utils";
import { useRouter } from "next/dist/client/router";
import { PAGE_NAME } from "@utils/constants";
import { useTranslation } from "react-i18next";

const PageLayout: React.FC = (props) => {
  const { t } = useTranslation();
  const { user } = getMeData();
  const { pathname, ...router } = useRouter();
  const page = `/${pathname.split("/")[1]}`;

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="flex bg-light-300">
      <Sidebar className="hidden md:block flex-shrink-0" />
      <main className="md:mx-8 w-full">
        <AdminNavbar
          showBackArrow={page !== "/"}
          onBackClick={handleBackClick}
          userName={user?.firstName || ""}
          userRole={user?.role || ""}
          pageName={t(PAGE_NAME[page])}
        />
        {props.children}
      </main>
    </div>
  );
};
export default PageLayout;
