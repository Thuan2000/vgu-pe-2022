import React from "react";
import Link from "next/link";

import MenuIcon from "@assets/icons/menu-icon";
import Logo from "../logo";
import Button from "../storybook/button";
import { ROUTES } from "@utils/routes";
import Search from "../search";
import SaveIcon from "@assets/icons/save-icon";
import NotificationIcon from "@assets/icons/notification-icon";
import UserProfile from "../user-profile";

const NavbarBottom = () => {
	return (
		<div className="flex-center justify-between py-4">
			<div className="flex-center ">
				<Logo size="medium" className="mr-7" />
				<Button
					size="small"
					className="p-0 m-0 hover:bg-light hover:border-gray-100 border-gray-100"
					style={{ width: "45px", height: "45px" }}
					variant="outline"
				>
					<MenuIcon className="hover:text-light" />
				</Button>
				<Search className="ml-4" />
				<SaveIcon className="mx-4" />
				<NotificationIcon />
			</div>

			{/* User Profile */}
			<UserProfile />

			{/* @TEMP */}
			{/* <Link href={ROUTES.LOGOUT}>
				<Button size="small">Logout</Button>
			</Link> */}
		</div>
	);
};
export default NavbarBottom;
