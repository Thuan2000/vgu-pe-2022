import React from "react";
import SiteSocials from "../site-socials";
import Navigations from "../navigations";
import LanguageSelector from "../language-selector";
import NavbarBottom from "./navbar-bottom";
const Navbar = () => {
  return (
    <div className="hidden sm:flex flex-col">
      <div className="flex justify-between items-center py-4 border-b-2">
        <SiteSocials />
        <Navigations />
        <LanguageSelector />
      </div>
      <NavbarBottom />
    </div>
  );
};
export default Navbar;
