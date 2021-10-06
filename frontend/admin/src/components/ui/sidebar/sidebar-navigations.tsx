import HomeIcon from "@assets/icons/navigations/home-icon";
import LogoutIcon from "@assets/icons/navigations/logout-icon";
import RequestIcon from "@assets/icons/navigations/request-icon";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "../link";
import { SC_LEFT_SPACING } from "./sidebar-constants";
const SidebarNavigations = () => {
  const { t } = useTranslation("common");
  const { pathname, ...router } = useRouter();
  const activePath = pathname.split("/")[1] || "";
  const navigations = [
    {
      label: "home-nav-label",
      href: ROUTES.HOMEPAGE,
      icon: HomeIcon,
    },
    {
      label: "postRequest-nav-label",
      href: ROUTES.POST_REQUEST,
      icon: RequestIcon,
    },
    {
      label: "logout-nav-label",
      href: ROUTES.LOGOUT,
      icon: LogoutIcon,
    },
  ];
  // @TODO, make this right
  const navs = navigations.map((nav, idx) => {
    const { label, href, icon: Icon } = nav;
    const isActive = href.split("/")[1] === activePath;
    return (
      <Link href={href} key={`${label}-${href}-navigation`}>
        <div
          className={`h-12 pl-11 flex items-center pl-${SC_LEFT_SPACING} ${
            isActive && "bg-primary bg-opacity-30 border-r-4 border-primary"
          }`}
        >
          <li
            className={`flex items-center text-md ${
              isActive && "text-black font-semibold"
            }`}
          >
            <Icon className="mr-3" isActive={isActive} />
            {t(label)}
          </li>
        </div>
      </Link>
    );
  });

  return <ul className="text-gray-300">{navs}</ul>;
};
export default SidebarNavigations;
