import { useLoggedInUserQuery } from "@graphql/auth.graphql";
import { trimText } from "@utils/functions";
import React from "react";
import { useTranslation } from "react-i18next";

import ProfileAvatar from "./profile-avatar";

const UserProfile = () => {
  const { t } = useTranslation("common");
  const { data, loading, error } = useLoggedInUserQuery();

  if (error) {
    console.log(error);
  }

  const user = data?.loggedInUser?.user;
  const verified = data?.loggedInUser?.company.approved;

  return (
    <div className="flex-center">
      <div className="flex flex-col text-right">
        <p className="paragraph flex items-center">
          {t("common:greeting")}
          <h3 className="ml-2">{trimText(`${user?.firstName}`, 10)}</h3>
        </p>
        {!verified && (
          <p className="text-red-600 font-light">{t("not-verified")}</p>
        )}
      </div>
      <ProfileAvatar />
    </div>
  );
};
export default UserProfile;
