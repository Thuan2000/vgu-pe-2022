import React from "react";
import SiteSocials from "../site-socials";
import NavbarNavigations from "../navbar-navigations";
import LanguageSelector from "../language-selector";
import NavbarBottom from "./navbar-bottom";
import { ROUTES } from "@utils/routes";
import Breadcrumb from "../storybook/breadcrumb";
import AppliedFilter from "./applied-filter";

interface INavbarProps {
  className: string;
}

const Navbar: React.FC<INavbarProps> = ({ className }) => {
  return (
    <div className={`z-50 ${className}`}>
      <div className="flex justify-between items-center py-3 bg-gray-10 px-10 md:px-48">
        <NavbarNavigations />
        <LanguageSelector />
      </div>
      <div className={`px-10 md:px-48 bg-white`}>
        <NavbarBottom />
        <div className="fic pb-1">
          <Breadcrumb className="ml-1 mr-24" homeHref={ROUTES.HOMEPAGE} />
          <AppliedFilter />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
