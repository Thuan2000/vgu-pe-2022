import React from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { ROUTES } from "@utils/routes";
import AvatarIcon from "@assets/icons/avatar-icon";
import Link from "../link";
import LogoutIcon from "@assets/icons/navigations/logout-icon";
import SettingIcon from "@assets/icons/navigations/settings-icon";
import styles from "./profile-menu.module.css";
import { getMeData } from "@utils/auth-utils";

const variants = {
  hidden: { opacity: 0.5, maxHeight: 0 },
  visible: { opacity: 1, maxHeight: 500 },
};

const ProfileMenu = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation("common");
  const { user, company } = getMeData();

  return (
    <motion.div
      className={`${styles["profile-menu"]} pt-3 w-64 z-50 overflow-hidden bg-white duration-200 shadow-sm ${className}`}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div className="bg-gray-10 p-3 flex items-center">
        <AvatarIcon className="mr-3" />
        <p className="font-semibold text-heading">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className="bg-primaryry-10 p-3 border">
        <p className="text-heading font-semibold">{company?.name}</p>
        {!company?.approved && (
          <p className="text-xs text-gray-300 mt-1">{t("not-verified")}</p>
        )}
      </div>
      <div className="border border-t-0 rounded-md rounded-t-none">
        <Link href={ROUTES.SETTINGS}>
          <div className="px-3 py-2 flex items-center ">
            <SettingIcon className="mr-4 h-4" />
            <p className="text-gray-400 h-6">{t("settings-menu")}</p>
          </div>
        </Link>
        <Link href={ROUTES.LOGOUT}>
          <div className="px-3 py-2 flex items-center">
            <LogoutIcon className="mr-4 h-6" />
            <p className="text-gray-400 h-6">{t("logout-menu")}</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProfileMenu;
