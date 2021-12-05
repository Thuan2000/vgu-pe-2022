import VerifiedIcon from "@assets/icons/verified-icon";
import React from "react";
import { getMeData } from "@utils/auth-utils";
import Logo from "../logo";
import SidebarNavigations from "./sidebar-navigations";
import LanguageSelector from "@components/language-selector";

const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { company } = getMeData();

  return (
    <div
      className="hidden sm:block relative shadow-md py-5 md:w-80 bg-white min-h-screen flex-shrink-0"
      {...props}
    >
      <div className="fixed w-[inherit] h-full flex-col">
        <div className={`pl-11`}>
          <div className="fic justify-between pr-3">
            <Logo size="big" />
            <LanguageSelector showText={false} />
          </div>
          <h3 className="flex items-center text-dark-blue mb-7 mt-4">
            {company?.name}
            {company?.approved && <VerifiedIcon className="w-4 h-4 ml-2" />}
          </h3>
        </div>
        <SidebarNavigations />
      </div>
    </div>
  );
};
export default Sidebar;
