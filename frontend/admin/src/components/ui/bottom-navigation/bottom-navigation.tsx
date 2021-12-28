import { COLORS } from "@utils/colors";
import { getActivePath } from "@utils/functions";
import { navigations } from "@utils/navigations";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "../link";

interface IPhoneBottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BottomNavigation: React.FC<IPhoneBottomNavigationProps> = (props) => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();

  function checkIsActive(href: string) {
    return getActivePath(pathname) === href;
  }

  const navs = navigations.map((nav, idx) => {
    const { href, label, icon: Icon } = nav;
    const isActive = checkIsActive(href);
    return (
      <Link href={href} key={href + label}>
        <div className="flex flex-col items-center justify-end w-20">
          <Icon
            className="w-6 h-5"
            fill={COLORS.GRAY.DEFAULT}
            isActive={isActive}
          />
          <p className={`text-xs text-gray ${isActive && "text-primary"}`}>
            {t(label)}
          </p>
        </div>
      </Link>
    );
  });

  return (
    <div {...props}>
      <div className="md:hidden fixed bottom-0 flex items-end justify-between w-full py-3 bg-white z-50 max-w-full shadow-top">
        {navs}
      </div>
    </div>
  );
};
export default BottomNavigation;
