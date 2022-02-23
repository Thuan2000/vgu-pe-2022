import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../storybook/typography";
import EditCompanyIllustration from "@assets/edit-company-illustration.png";
import Image from "next/image";
import Button from "../storybook/button";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { getLoginCompanySlug } from "@utils/functions";
import Link from "../link";
import useIsFullInfoCompChecker from "src/hooks/useIsFullInfoCompChecker";

interface IEditCompanyReminderProps {}

const EditCompanyReminder: React.FC<IEditCompanyReminderProps> = ({}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const isFullInfoComp = useIsFullInfoCompChecker();

  if (isFullInfoComp) return <></>;

  return (
    <div className={`bg-blue-300 px-10 md:px-48 py-3 flex justify-between`}>
      <div className={`fic space-x-2`}>
        <div className={`w-5 h-5 relative`}>
          <Image
            alt="please-edit-company"
            src={EditCompanyIllustration}
            layout="fill"
          />
        </div>
        <Typography
          text={t("please-title")}
          size="md"
          weight="bold"
          color="white"
        />
        <Typography
          text={t("please-edit-your-company-title")}
          size="md"
          color="white"
        />
      </div>

      <Link
        href={`${ROUTES.ADMIN_LINK}/${locale}/${getLoginCompanySlug()}`}
        target="_blank"
        rel="noreferrer"
      >
        <Button color="error">{t("edit-company-button-label")}</Button>
      </Link>
    </div>
  );
};
export default EditCompanyReminder;
