import { getMeData, setMeData } from "@utils/auth-utils";
import { trimText } from "@utils/functions";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "./link";

import ProfileAvatar from "./profile-avatar";
import Button from "./storybook/button";

const UserProfile = () => {
  const { t } = useTranslation("common");
  const { user, company } = getMeData();

  return (
    <div className="flex-center">
      {!company?.approved ? (
        <div className="flex flex-col text-right">
          <p className="paragraph flex items-center">
            {t("common:greeting")}
            <strong className="ml-1">
              {trimText(`${user?.firstName}`, 10)}
            </strong>
          </p>
          <p
            className="text-red-600 font-light"
            style={{ color: "rgba(220, 38, 38, var(--tw-text-opacity))" }}
          >
            {t("not-verified")}
          </p>
        </div>
      ) : (
        <div>
          <Link href={`/admin/${company?.slug}/post-request`}>
            <Button size="small">{t("post-request-link-button-label")}</Button>
          </Link>
        </div>
      )}
      <ProfileAvatar />
    </div>
  );
};
export default UserProfile;
