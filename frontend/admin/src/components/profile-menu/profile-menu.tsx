import React, { Children } from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

import styles from "./profile-menu.module.css";
import { getMeData, isLogin } from "@utils/auth-utils";
import Button from "../ui/storybook/button";
import LogoutIcon from "@assets/icons/navigations/logout-icon";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";

const variants = {
  hidden: { opacity: 1, maxHeight: 0 },
  visible: { opacity: 1, maxHeight: 500 },
};

const ProfileMenu = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation("common");
  const { user, company } = getMeData();

  return (
    <Wrapper>
      <div className="bg-white px-3 pb-3 border-b-1 flex items-center">
        <p className="font-semibold text-md">
          {user?.firstName} {user?.lastName}
        </p>
      </div>
      <Link href={ROUTES.LOGOUT}>
        <div className="bg-primary bg-opacity-10 px-3 py-2 flex items-center">
          <LogoutIcon className="mr-4 h-5 w-4" />
          <p className="text-gray-400 text-xs">{t("logout-menu")}</p>
        </div>
      </Link>
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
