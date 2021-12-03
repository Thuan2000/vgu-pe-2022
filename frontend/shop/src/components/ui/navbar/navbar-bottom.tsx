import React from "react";
import Link from "next/link";

import Logo from "../logo";
import Search from "../search";
import UserProfile from "../user-profile";
import { useRouter } from "next/dist/client/router";
import { getActivePageFromPath } from "@utils/functions";
import { Page } from "@utils/interfaces";

const NavbarBottom = () => {
  const { pathname } = useRouter();

  const activePage = getActivePageFromPath(pathname) as Page;

  return (
    <div className="flex-center justify-between pt-2">
      <div className="flex-center space-x-10">
        <div style={{ width: 250 }}>
          <Logo size="medium" />
        </div>
        <div className="flex-center">
          {/* <Category /> */}
          {!["ho-tro", ""].includes(activePage) && <Search />}
          {/* <SaveIcon className="mx-4" /> */}
          {/* <Link href={ROUTES.NOTIFICATIONS} passHref>
            <NotificationIcon />
          </Link> */}
        </div>
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};
export default NavbarBottom;
