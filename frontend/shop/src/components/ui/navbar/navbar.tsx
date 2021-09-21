import React from "react";
import SiteSocials from "../site-socials";
import Logo from "../logo";
import Link from "../link";
import Navigations from "../navigations";
import LanguageSelector from "../language-selector";
import Button from "../storybook/button";
import MenuIcon from "@assets/icons/menu-icon";
import NavbarBottom from "./navbar-bottom";
const Navbar = () => {
	return (
		<div className="flex flex-col">
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
