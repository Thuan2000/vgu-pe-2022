import React from "react";
import Link from "next/link";

import MenuIcon from "@assets/icons/menu-icon";
import Logo from "../logo";
import Button from "@storybook/button";
import { ROUTES } from "@utils/routes";
import Search from "../search";
import SaveIcon from "@assets/icons/save-icon";
import NotificationIcon from "@assets/icons/notification-icon";
import UserProfile from "../user-profile";
import Category from "../category";

const NavbarBottom = () => {
  return (
    <div className="flex-center justify-between py-4">
      <div className="flex-center ">
        <Logo size="medium" className="mr-7" />
        <Category />
        <Search className="ml-4" />
        <button>
          <SaveIcon className="mx-4" />
        </button>
        <Link href={ROUTES.NOTIFICATIONS} passHref>
          <NotificationIcon />
        </Link>
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};
export default NavbarBottom;
