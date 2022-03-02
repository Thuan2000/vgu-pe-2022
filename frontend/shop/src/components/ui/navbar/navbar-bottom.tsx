import React from "react";

import Logo from "../logo";
import Search from "../search";
import UserProfile from "../user-profile";
import { useRouter } from "next/dist/client/router";
import { getActivePageFromPath } from "@utils/functions";
import { PageName } from "@utils/interfaces";

const UNSEARCHABLES = ["ho-tro", ""];

const NavbarBottom = () => {
  const { pathname } = useRouter();

  const { query } = useRouter();
  const isDetailedPage = !!query.slug;

  const activePage = getActivePageFromPath(pathname) as PageName;

  return (
    <div className="flex-center justify-between pt-2">
      <div className="flex-center space-x-7">
        <div style={{ width: 250 }}>
          <Logo size="medium" />
        </div>
        <div className="fic">
          {!isDetailedPage && !UNSEARCHABLES.includes(activePage) && <Search />}
        </div>
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};
export default NavbarBottom;
