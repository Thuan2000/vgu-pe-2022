import { getMeData, setMeData } from "@utils/auth-utils";
import { PAGE_NAME_INTO_LABEL } from "@utils/constants";
import {
  getActivePageFromPath,
  getLoginCompanySlug,
  getUserFirstName,
  getUserFullName,
  trimText,
} from "@utils/functions";
import { Page } from "@utils/interfaces";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "./link";

import ProfileAvatar from "./profile-avatar";
import Button from "./storybook/button";
import Typography from "./storybook/typography";

const POST_ROUTES = {
  ["san-pham-dich-vu"]: `${ROUTES.POST_PRODUCT_SERVICE}`,
  ["nhu-cau-thu-mua"]: `${ROUTES.POST_TENDER}`,
  ["danh-ba-cong-ty"]: `asdf`,
  ["ho-tro"]: `${ROUTES.POST_TENDER}`,
};

const UserProfile = () => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const activePage: Page = getActivePageFromPath(pathname) as Page;

  const adminLink = process.env.NEXT_PUBLIC_ADMIN_URL;
  return (
    <div className="flex-center">
      {!["ho-tro", "", "danh-ba-cong-ty"].includes(activePage) ? (
        <div>
          <Link target="_blank" href={`${adminLink}${POST_ROUTES[activePage]}`}>
            <Button
              className={`px-3 h-7`}
              size="extraSmall"
              style={{ fontSize: 12 }}
            >
              {t(`post-${PAGE_NAME_INTO_LABEL[activePage]}-link-button-label`)}
            </Button>
          </Link>
        </div>
      ) : (
        <div className={`fic space-x-1`}>
          <Typography text={`${t("greeting")},`} />
          <Typography text={getUserFullName()} variant="smallTitle" />
        </div>
      )}
      <ProfileAvatar />

      {/* {!company?.approved ? (
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
          <Link href={`${adminLink}${ROUTES.POST_TENDER || "/post-tender"}`}>
            <Button className="!h-9" size="small" style={{fontSize: 12}}>
              {t("post-request-link-button-label")}
            </Button>
          </Link>
        </div>
      )} */}
    </div>
  );
};
export default UserProfile;
