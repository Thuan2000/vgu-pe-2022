import React from "react";
import Link from "next/link";

import Logo from "../logo";
import { ROUTES } from "@utils/routes";
import Search from "../search";
import SaveIcon from "@assets/icons/save-icon";
import NotificationIcon from "@assets/icons/notification-icon";
import UserProfile from "../user-profile";
import Category from "../category";
import Button from "../storybook/button";

const NavbarBottom = () => {
  return (
    <div className="flex-center justify-between pt-2">
      <div className="flex-center space-x-10">
        <Logo size="medium" />
        <div className="flex-center">
          <Category />
          <Search className="ml-4" />
          <Button className="!h-9 px-0" size="small" variant="custom">
            <SaveIcon className="mx-4" />
          </Button>
          <Link href={ROUTES.NOTIFICATIONS} passHref>
            <NotificationIcon />
          </Link>
        </div>
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};
export default NavbarBottom;
