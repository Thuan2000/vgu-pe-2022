import React, { Children } from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import { ROUTES } from "@utils/routes";
import AvatarIcon from "@assets/icons/avatar-icon";
import Link from "../link";
import LogoutIcon from "@assets/icons/navigations/logout-icon";
import SettingIcon from "@assets/icons/navigations/settings-icon";
import styles from "./profile-menu.module.css";
import { getMeData, isLogin } from "@utils/auth-utils";
import { getLoginCompanySlug } from "@utils/functions";
import Button from "../storybook/button";
import { useRouter } from "next/router";

const variants = {
  hidden: { opacity: 1, maxHeight: 0 },
  visible: { opacity: 1, maxHeight: 500 },
};

const ProfileMenu = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation("common");
  const { user, company } = getMeData();
  const { locale } = useRouter();

  if (!isLogin())
    return (
      <Wrapper>
        <div className="bg-gray-10 p-3 flex-center">
          <Button>{t("login-button-label")}</Button>
        </div>
      </Wrapper>
    );

  return (
    <Wrapper>
      <div className="bg-gray-10 p-3 flex items-center">
        <AvatarIcon className="mr-3" />
        <p className="font-semibold text-heading">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <div className="bg-green-10 p-3 border">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`${ROUTES.ADMIN_LINK}/${locale}/${getLoginCompanySlug()}`}
        >
          <p className="text-heading font-semibold">{company?.name}</p>
        </Link>
      </div>
      <div className="border border-t-0 rounded-md rounded-t-none">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`${ROUTES.ADMIN_LINK}/${locale}/${getLoginCompanySlug()}`}
        >
          <div className="px-3 py-2 flex items-center ">
            <AvatarIcon fill="#82868C" className="mr-4 h-6 w-4" />
            <p className="text-gray-400 h-6">{t("admin-panel-menu-label")}</p>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={`${ROUTES.ADMIN_LINK}${ROUTES.SETTINGS}`}
        >
          <div className="px-3 py-2 flex items-center ">
            <SettingIcon className="mr-4 h-6 w-4" />
            <p className="text-gray-400 h-6">{t("settings-menu")}</p>
          </div>
        </Link>

        <Link href={ROUTES.LOGOUT}>
          <div className="px-3 py-2 flex items-center">
            <LogoutIcon className="mr-4 h-6 w-4" />
            <p className="text-gray-400 h-6">{t("logout-menu")}</p>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper: React.FC<{ className?: string }> = ({ children, className }) => {
  return (
    <motion.div
      className={`${styles["profile-menu"]} absolute right-0 pt-3 w-64 z-50 overflow-hidden bg-white duration-200 shadow-sm ${className}`}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ProfileMenu;
