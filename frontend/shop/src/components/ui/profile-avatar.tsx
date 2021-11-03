import React, { useState } from "react";

import AvatarIcon from "@assets/icons/avatar-icon";
import ProfileMenu from "./profile-menu";

const ProfileAvatar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onClick={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button className="border h-9 w-9 center-child rounded-md ml-4">
        <AvatarIcon />
      </button>
      {showMenu && <ProfileMenu className="absolute right-0" />}
    </div>
  );
};
export default ProfileAvatar;
