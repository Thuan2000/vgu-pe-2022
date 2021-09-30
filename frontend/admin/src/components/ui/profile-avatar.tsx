import React, { useState } from "react";
import { motion } from "framer-motion";

import AvatarIcon from "@assets/icons/avatar-icon";
import { useTranslation } from "react-i18next";
import SettingsIcon from "@assets/icons/navigations/settings-icon";
import LogoutIcon from "@assets/icons/navigations/logout-icon";
import Link from "./link";
import { ROUTES } from "@utils/routes";
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
      <button className="border h-11 w-11 center-child rounded-md ml-4">
        <AvatarIcon />
      </button>
      {showMenu && <ProfileMenu className="absolute right-0" />}
    </div>
  );
};
export default ProfileAvatar;
