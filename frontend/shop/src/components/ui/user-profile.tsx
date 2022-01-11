import { PAGE_NAME_INTO_LABEL } from "@utils/constants";
import { getActivePageFromPath, getUserFullName } from "@utils/functions";
import { PageName } from "@utils/interfaces";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "./link";

import ProfileAvatar from "./profile-avatar";
import Button from "./storybook/button";
import Typography from "./storybook/typography";

const POST_ROUTES: any = {
  ["san-pham"]: `${ROUTES.POST_PRODUCT_SERVICE}?target=product`,
  ["dich-vu"]: `${ROUTES.POST_PRODUCT_SERVICE}?target=service`,
  ["nhu-cau-thu-mua"]: `${ROUTES.POST_TENDER}`,
  ["ho-tro"]: `${ROUTES.POST_TENDER}`,
};

const UserProfile = () => {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  const activePage: PageName = getActivePageFromPath(pathname) as PageName;

  const adminLink = process.env.NEXT_PUBLIC_ADMIN_URL;
  return (
    <div className="flex-center">
      {!["ho-tro", "", "nha-cung-cap"].includes(activePage) ? (
        <div>
          <Link target="_blank" href={`${adminLink}${POST_ROUTES[activePage]}`}>
            <Button
              className={`px-3 h-9`}
              size="extraSmall"
              style={{ fontSize: 12 }}
            >
              {t(`post-${PAGE_NAME_INTO_LABEL[activePage]}-link-button-label`)}
            </Button>
          </Link>
        </div>
      ) : (
        <div className={`fic space-x-1 flex-shrink-0`}>
          <Typography text={`${t("greeting")},`} />
          <Typography text={getUserFullName()} variant="smallTitle" />
        </div>
      )}
      <ProfileAvatar />
    </div>
  );
};
export default UserProfile;
