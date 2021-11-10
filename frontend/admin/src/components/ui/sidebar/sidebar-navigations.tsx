import React, { useState } from "react";

import { useRouter } from "next/dist/client/router";
import SidebarNavItem from "./sidebar-nav-item";
import { getMeData } from "@utils/auth-utils";
import { INavigation, navigations } from "@utils/navigations";
import { getActivePath } from "@utils/functions";

const SidebarNavigations = () => {
  const { pathname } = useRouter();

  function checkIsActive(href: string[]) {
    return href.includes(getActivePath(pathname));
  }

  function checkIsActiveChildren(children: INavigation[]) {
    let haveActiveChild = false;
    children.forEach((child) => {
      if (child.href === getActivePath(pathname)) haveActiveChild = true;
      if (child.managedLinks?.includes(getActivePath(pathname)))
        haveActiveChild = true;
    });

    return haveActiveChild;
  }

  const navs = navigations.map(
    ({ label, href, icon: Icon, children, managedLinks = [] }) => {
      const isActive = !!children
        ? checkIsActiveChildren(children)
        : checkIsActive([href, ...managedLinks]);
      return (
        <div
          className={`overflow-hidden max-h-12 ${
            isActive && "max-h-56 transition-all duration-300"
          }`}
          key={`${label}-${href}-navigation`}
        >
          <SidebarNavItem
            isActive={isActive}
            href={`${href}` || ""}
            Icon={Icon}
            label={label}
            hasChildren={children && children?.length > 0}
          />
          {children?.map(({ href, label, managedLinks = [] }) => {
            const isActiveChild = checkIsActive([href, ...managedLinks]);
            return (
              <SidebarNavItem
                isActive={isActiveChild}
                isChildren
                key={href + label}
                label={label}
                href={`${href}` || ""}
              />
            );
          })}
        </div>
      );
    }
  );

  return <ul className="text-gray-300">{navs}</ul>;
};
export default SidebarNavigations;
