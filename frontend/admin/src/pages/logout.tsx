import Loader from "@components/ui/storybook/loader/loader";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  removeAuthCredentials,
  removeChatAuthToken,
  removeIsFullInfoTrue,
  removeMeData,
} from "../utils/auth-utils";
import { ROUTES } from "../utils/routes";
const Logout = () => {
  const { replace, locale } = useRouter();
  const { t } = useTranslation("common");

  useEffect(() => {
    removeAuthCredentials();
    removeChatAuthToken();
    removeMeData();
    removeIsFullInfoTrue();
    replace(ROUTES.LOGIN(locale));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader text={`${t("logging-out")}`} />;
};
export default Logout;
