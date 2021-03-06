import { siteSettings } from "@settings/site.settings";
import { getActivePagePath } from "@utils/functions";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "./link";

const NavbarNavigations = () => {
  const { navigations } = siteSettings;
  const { pathname } = useRouter();

  const { t } = useTranslation("common");

  function checkIsActive(href: string) {
    return getActivePagePath(pathname) === href;
  }

  return (
    <div>
      {navigations?.length > 0 &&
        navigations.map((navigation) => {
          const { href, label } = navigation;
          return (
            <Link
              href={href}
              key={navigation.label + "Nav-item"}
              className={`pr-16 text-sm
              ${
                checkIsActive(href)
                  ? "text-black font-semibold"
                  : "text-gray-200"
              }`}
            >
              {t(label)}
            </Link>
          );
        })}
    </div>
  );
};
export default NavbarNavigations;
