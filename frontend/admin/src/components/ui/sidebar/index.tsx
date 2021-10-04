import VerifiedIcon from "@assets/icons/verified-icon";
import { getMeData } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import React, { Attributes, ReactElement } from "react";
import Link from "../link";
import Logo from "../logo";
import Button from "../storybook/button";
import SidebarNavigations from "./sidebar-navigations";

const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { company } = getMeData();

  const className = `flex flex-col px-11 shadow-md md:w-80 py-5 bg-white min-h-screen ${props.className}`;

  return (
    <div className={className}>
      <Logo size="big" />
      <h3 className="flex items-center my-5">
        {company?.name || ""} <VerifiedIcon className="w-4 h-4 ml-2" />
      </h3>
      <SidebarNavigations />
    </div>
  );
};
export default Sidebar;
