import HomeIcon from "@assets/icons/navigations/home-icon";
import React from "react";
import Link from "../link";
const SidebarNavigations = () => {
  const navigations = [
    {
      label: "Home",
      href: "#",
      icon: HomeIcon,
    },
    {
      label: "Post Request",
      href: "/post-request",
      icon: HomeIcon,
    },
  ];
  // @TODO, make this right
  const navs = navigations.map((nav, idx) => {
    const isActive = idx === 0;
    const { label, href, icon: Icon } = nav;
    return (
      <Link href={href} key={`${label}-${href}-navigation`}>
        <li
          className={`mb-3 flex items-center text-md ${
            isActive && "text-green"
          }`}
        >
          <Icon className="mr-3" isActive={isActive} />
          {label}
        </li>
      </Link>
    );
  });

  return <ul className="text-gray-300">{navs}</ul>;
};
export default SidebarNavigations;
