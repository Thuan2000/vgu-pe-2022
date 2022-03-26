import { SubscriptionInfoText } from "./subscription-info-text";
import { isLogin } from "@utils/auth-utils";
import { PAGE_NAME_INTO_LABEL } from "@utils/constants";
import { getActivePageFromPath, getUserFullName } from "@utils/functions";
import { PageName } from "@utils/interfaces";
import { NO_POST_ROUTES, ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "./link";
import NewChat from "./navbar/new-chat";

import ProfileAvatar from "./profile-avatar";
import Button from "./storybook/button";
import Typography from "./storybook/typography";

const POST_ROUTES: any = {
  [ROUTES.PRODUCTS]: `${ROUTES.POST_PRODUCT_SERVICE}?target=product`,
  [ROUTES.SERVICES]: `${ROUTES.POST_PRODUCT_SERVICE}?target=service`,
  [ROUTES.TENDERS]: `${ROUTES.POST_TENDER}`,
  ["/ho-tro"]: `${ROUTES.POST_TENDER}`,
};

const UserProfile = () => {
  const { t } = useTranslation("common");
  const { pathname, locale } = useRouter();
  const activePage: PageName = `/${getActivePageFromPath(
    pathname
  )}` as PageName;
  const adminLink = process.env.NEXT_PUBLIC_ADMIN_URL;

  if (!isLogin()) {
    return (
      <div className={`flex-center`}>
        <Link href={`${ROUTES.LOGIN}`}>
          <Button
            className={`px-3 h-9`}
            size="extraSmall"
            style={{ fontSize: 12 }}
          >
            {t(`login-button-label`)}
          </Button>
        </Link>

        <ProfileAvatar />
      </div>
    );
  }

  return (
    <div className="flex-center">
      <div style={{ marginRight: "1rem" }}>
        <NewChat />
      </div>
      {!NO_POST_ROUTES.includes(activePage) ? (
        <div style={{ marginLeft: "1rem" }}>
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
        <div>
          <div className={`justify-end fic space-x-1 flex-shrink-0`}>
            <Typography text={`${t("greeting")},`} />
            <Typography text={getUserFullName()} variant="smallTitle" />
          </div>
          <SubscriptionInfoText />
        </div>
      )}
      <ProfileAvatar />
    </div>
  );
};
export default UserProfile;
