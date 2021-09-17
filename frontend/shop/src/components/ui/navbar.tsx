import React from "react";
import SiteSocials from "./site-socials";
import Logo from "./logo";
import Link from "./link";
import Navigations from "./navigations";
import LanguageSelector from "./language-selector";
import Button from "./storybook/button";
import MenuIcon from "@assets/icons/menu-icon";
const Navbar = () => {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between items-center py-4 border-b-2">
				<SiteSocials />
				<Navigations />
				<LanguageSelector />
			</div>
			<div className="flex-center justify-between py-4">
				<div className="flex-center ">
					<Logo size="medium" className="mr-7" />
					<Button
						size="small"
						className="px-2 py-0.5 border-gray-700 hover:border-gray-700 hover:bg-light"
						variant="outline"
					>
						<MenuIcon className="hover:text-light m-0" />
					</Button>
				</div>
				{/* <Search /> */}

				{/* Post Request */}

				{/* User Profile */}

				{/* @TEMP */}
				<Button size="small">
					<Link
						href="/logout"
						className="text-white hover:text-white"
					>
						Logout
					</Link>
				</Button>
			</div>
		</div>
	);
};
export default Navbar;
