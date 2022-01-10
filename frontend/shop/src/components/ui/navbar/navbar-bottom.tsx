import React from "react";

import Logo from "../logo";
import Search from "../search";
import UserProfile from "../user-profile";
import { useRouter } from "next/dist/client/router";
import { getActivePageFromPath } from "@utils/functions";
import { Page } from "@utils/interfaces";

const UNSEARCHABLES = ["ho-tro", ""];

const NavbarBottom = () => {
  const { pathname } = useRouter();

  const activePage = getActivePageFromPath(pathname) as Page;

  return (
    <div className="flex-center justify-between pt-2">
      <div className="flex-center space-x-10">
        <div style={{ width: 250 }}>
          <Logo size="medium" />
        </div>
        <div className="fic">
          {!UNSEARCHABLES.includes(activePage) && <Search />}
        </div>
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};
export default NavbarBottom;
