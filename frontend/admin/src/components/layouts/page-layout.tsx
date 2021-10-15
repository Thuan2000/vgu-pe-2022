import React from "react";
import Sidebar from "@components/ui/sidebar";
import DesktopAdminNavbar from "@components/desktop-admin-navbar";
import router, { useRouter } from "next/dist/client/router";
import { useTranslation } from "react-i18next";
import PhoneAdminNavbar from "@components/phone-admin-navbar";
import BottomNavigation from "@components/ui/bottom-navigation";
import { ROUTES } from "@utils/routes";
import { PAGE_NAME_BY_ROUTE } from "@utils/pagePath";
import { getActivePath } from "@utils/functions";

const PageLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

  const acivePath = getActivePath(pathname);

  const isHomepage = activePath === ROUTES.HOMEPAGE;
  const pageName = PAGE_NAME_BY_ROUTE[activePath];

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="flex bg-light-300">
      <BottomNavigation className="sm:hidden" />
      <Sidebar />
      <main className="md:mx-8 w-full mb-16 sm:mb-0">
        <PhoneAdminNavbar
          showBackArrow={!isHomepage}
          pageName={t(pageName)}
          onBackClick={handleBackClick}
          className="sm:hidden"
        />
        <DesktopAdminNavbar
          showBackArrow={!isHomepage}
          pageName={t(pageName)}
          onBackClick={handleBackClick}
          className="hidden sm:block"
        />
        {children}
      </main>
    </div>
  );
};
export default PageLayout;
