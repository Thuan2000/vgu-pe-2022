import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "../storybook/typography";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import { ROUTES } from "@utils/routes";
import DownVIcon from "@assets/icons/down-v-icon";

interface ISettingSecurityFormProps {}

const SettingSecurityForm: React.FC<ISettingSecurityFormProps> = () => {
  const { t } = useTranslation("common");
  const { query, ...router } = useRouter();

  return (
    <div className="space-y-2 mx-5">
      <Typography
        text={t("setting-changePass-label")}
        align="left"
        variant="bigTitle"
      />
      <div className="flex flex-row justify-end">
        <Link href={ROUTES.LOGOUT}>
          <Button variant="cancel" size="small" className="md:w-1/1">
            {t("cancel-button")}
          </Button>
        </Link>
        <Link href={ROUTES.SETTINGS}>
          <Button size="small" className="md:w-1/1 ml-2">
            {t("save-button")}
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default SettingSecurityForm;
