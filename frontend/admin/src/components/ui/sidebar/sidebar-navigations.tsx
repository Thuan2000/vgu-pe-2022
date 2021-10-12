import React, { useState } from "react";

import { useRouter } from "next/dist/client/router";
import { navigations } from "./sidebar-constants";
import SidebarNavItem from "./sidebar-nav-item";
import { getMeData } from "@utils/auth-utils";

const SidebarNavigations = () => {
  const [activeItemIdx, setActiveItemIdx] = useState(0);
  const [activeChildIdx, setActiveChildIdx] = useState(0);
  const { query, ...router } = useRouter();
  const { company } = getMeData();

  // @TODO, make this right
  const navs = navigations.map(({ label, href, icon: Icon, children }, idx) => {
    // const isActive = checkActiveNav(href || "", activePath);
    const isActive = idx === activeItemIdx;
    return (
      <div
        className={`overflow-hidden max-h-12 ${
          isActive && "max-h-56 transition-all duration-300"
        }`}
        key={`${label}-${href}-navigation`}
      >
        <SidebarNavItem
          isActive={idx === activeItemIdx}
          href={`${href}` || ""}
          Icon={Icon}
          label={label}
          onClick={() => {
            setActiveItemIdx(idx);
            setActiveChildIdx(0);
          }}
          hasChildren={children && children?.length > 0}
        />
        {children?.map(({ href, label }, childIdx) => {
          return (
            <SidebarNavItem
              key={href + label}
              label={label}
              href={`${href}` || ""}
              className={`ml-7 ${
                childIdx === activeChildIdx && "text-primary"
              }`}
              onClick={() => {
                setActiveChildIdx(childIdx);
                setActiveItemIdx(idx);
              }}
            />
          );
        })}
      </div>
    );
  });

  return <ul className="text-gray-300">{navs}</ul>;
};
export default SidebarNavigations;
