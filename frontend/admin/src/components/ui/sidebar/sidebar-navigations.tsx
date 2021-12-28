import React, { useState } from "react";

import { useRouter } from "next/dist/client/router";
import SidebarNavItem from "./sidebar-nav-item";
import {
  bottomNavigations,
  INavigation,
  navigations,
} from "@utils/navigations";
import { getActivePath, getLoggedInUser } from "@utils/functions";
import { getMeData } from "@utils/auth-utils";

const SidebarNavigations = () => {
  const { pathname } = useRouter();

  const role = getLoggedInUser()?.role;

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

  return (
    <ul className="flex-col text-gray-300 h-full">
      <div>
        {navigations.map(
          ({ label, href, icon: Icon, children, managedLinks = [] }) => {
            let isActive = !!children
              ? checkIsActiveChildren(children)
              : checkIsActive([href, ...managedLinks]);

            if (href === "[company-slug]") {
              href = getMeData().company?.slug!;
              isActive = getActivePath(pathname) === "/[company-slug]";
            }

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
        )}
      </div>

      <div className={`mt-auto -translate-y-10`}>
        {/* <SidebarNavItem
          key={`${settingSidebar.label}-setting-bottom-navigation`}
          isActive={getActivePath(pathname) === "/[company-slug]"}
          href={getMeData().company?.slug || ""}
          label={settingSidebar.label}
          Icon={settingSidebar.icon}
        /> */}

        {bottomNavigations.map(({ href, icon, managedLinks, label }) => {
          const isActive = checkIsActive([href, ...managedLinks]);
          return (
            <SidebarNavItem
              key={`${label}-${href}-bottom-navigation`}
              isActive={isActive}
              href={href}
              label={label}
              Icon={icon}
            />
          );
        })}
      </div>
    </ul>
  );
};
export default SidebarNavigations;
