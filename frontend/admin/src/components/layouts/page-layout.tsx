import React, { useEffect } from "react";
import Sidebar from "@components/ui/sidebar";
import DesktopAdminNavbar from "@components/desktop-admin-navbar";
import { getMeData } from "@utils/auth-utils";
import { useRouter } from "next/dist/client/router";
import { useTranslation } from "react-i18next";
import { usePageName } from "src/contexts/page-name.context";
import useIsPhone from "src/hooks/isPhone.hook";
import PhoneAdminNavbar from "@components/phone-admin-navbar";
import BottomNavigation from "@components/ui/bottom-navigation";

const PageLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const { setPageName } = usePageName();
  const isPhone = useIsPhone();

  // Just do console.log(children) everything will show up this is why
  // every page compoent has this PageComponent.PageName = {pagename}
  const childrenPageName = (children as any)?.type?.PageName;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPageName(childrenPageName), [childrenPageName]);

  return (
    <div className="flex bg-light-300">
      {isPhone ? <BottomNavigation /> : <Sidebar className="flex-shrink-0" />}
      <main className="md:mx-8 w-full">
        {isPhone ? <PhoneAdminNavbar /> : <DesktopAdminNavbar />}
        {children}
      </main>
    </div>
  );
};
export default PageLayout;
