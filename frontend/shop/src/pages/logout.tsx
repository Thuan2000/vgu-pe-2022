import Loader from "@components/ui/storybook/loader/loader";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  removeAuthCredentials,
  removeChatAuthToken,
  removeMeData,
} from "../utils/auth-utils";
import { ROUTES } from "../utils/routes";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const Logout = () => {
  const { replace, locale } = useRouter();
  const { t } = useTranslation("common");

  useEffect(() => {
    removeAuthCredentials();
    removeChatAuthToken();
    removeMeData();
    replace(ROUTES.TO_LOGIN(locale!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loader text={`${t("logging-out")}`} />;
};
export default Logout;
