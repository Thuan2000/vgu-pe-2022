import React from "react";
import SiteSocials from "../site-socials";
import Navigations from "../navigations";
import LanguageSelector from "../language-selector";
import NavbarBottom from "./navbar-bottom";
import { ROUTES } from "@utils/routes";
import Breadcrumb from "../storybook/breadcrumb";
import AppliedFilter from "./applied-filter";

const Navbar = () => {
  return (
    <div className="hidden sm:flex flex-col sticky top-0 bg-white z-50 mx-[-10px] px-[10px]">
      <div className="flex justify-between items-center py-3 border-b-2">
        <SiteSocials />
        <Navigations />
        <LanguageSelector />
      </div>
      <NavbarBottom />
      <div className="fic pb-1">
        <Breadcrumb className="ml-1 mr-24" homeHref={ROUTES.HOMEPAGE} />
        <AppliedFilter />
      </div>
    </div>
  );
};
export default Navbar;
