import React, { useEffect, useState } from "react";
import NavbarNavigations from "../navbar-navigations";
import LanguageSelector from "../language-selector";
import NavbarBottom from "./navbar-bottom";
import { ROUTES } from "@utils/routes";
import Breadcrumb from "../storybook/breadcrumb";
import { getIsCompanyFullInfo } from "@utils/functions";
import EditCompanyReminder from "./edit-company-reminder";
import { isLogin } from "@utils/auth-utils";

interface INavbarProps {
  className: string;
}

const Navbar: React.FC<INavbarProps> = ({ className }) => {
  const [isFullInfo, setIsFullInfo] = useState(getIsCompanyFullInfo());

  useEffect(() => {
    setIsFullInfo(getIsCompanyFullInfo());
  }, []);

  return (
    <div className={`z-50 ${className}`}>
      <div className="flex justify-between items-center py-3 bg-gray-10 px-10 md:px-48">
        <NavbarNavigations />
        <LanguageSelector />
      </div>
      {/* {isLogin() && isFullInfo ? <></> : <EditCompanyReminder />} */}
      <div className={`px-10 md:px-48 bg-white`}>
        <NavbarBottom />
        <div className="fic">
          <Breadcrumb className="ml-1 mb-1" homeHref={ROUTES.HOMEPAGE} />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
