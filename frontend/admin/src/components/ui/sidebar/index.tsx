import VerifiedIcon from "@assets/icons/verified-icon";
import { getMeData } from "@utils/auth-utils";
import React, { Attributes, ReactElement } from "react";
import Logo from "../logo";
import { SC_LEFT_SPACING } from "./sidebar-constants";
import SidebarNavigations from "./sidebar-navigations";

const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { company } = getMeData();

  return (
    <div
      className={`relative shadow-md py-5 md:w-80 bg-white min-h-screen ${props.className}`}
      style={{ boxSizing: "border-box" }}
    >
      <div
        className="fixed"
        style={{ width: "inherit", boxSizing: "border-box" }}
      >
        <div className={`pl-11 pl-${SC_LEFT_SPACING}`}>
          <Logo size="big" />
          <h3 className="flex items-center mb-7 mt-4">
            {company?.name || ""}{" "}
            {company?.approved && <VerifiedIcon className="w-4 h-4 ml-2" />}
          </h3>
        </div>
        <SidebarNavigations />
      </div>
    </div>
  );
};
export default Sidebar;
