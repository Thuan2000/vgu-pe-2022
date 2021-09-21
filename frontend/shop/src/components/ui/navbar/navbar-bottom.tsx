import React from "react";
import Link from "next/link";

import MenuIcon from "@assets/icons/menu-icon";
import Logo from "../logo";
import Button from "../storybook/button";
import { ROUTES } from "@utils/routes";

const NavbarBottom = () => {
	return (
		<div className="flex-center justify-between py-4">
			<div className="flex-center ">
				<Logo size="medium" className="mr-7" />
				<Button
					size="small"
					className="p-0 m-0 hover:bg-white border-gray-200"
					style={{ width: "45px", height: "45px" }}
					variant="outline"
				>
					<MenuIcon className="hover:text-light m-0" />
				</Button>
			</div>
			{/* <Search /> */}

			{/* Post Request */}

			{/* User Profile */}

			{/* @TEMP */}
			<Link href={ROUTES.LOGOUT}>
				<Button size="small">Logout</Button>
			</Link>
		</div>
	);
};
export default NavbarBottom;
