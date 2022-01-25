import SuccessAnimationIcon from "@assets/icons/success-animation-icon";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import React from "react";

interface IFPCheckEmailProps {}

const FPCheckEmail: React.FC<IFPCheckEmailProps> = ({}) => {
  const { t } = useTranslation("form");

  return (
    <>
      <div className="fic flex-col">
        {<SuccessAnimationIcon className={`w-24 h-24`} />}
        <Typography text={t("email-sent-title")} size="xl" weight="bold" />
        <Typography text={t("email-sent-title")} size="md" />
      </div>

      <p className={`text-center`}>
        <Link
          tabIndex={0}
          // target="_blank"
          // rel="noreferrer"
          href={ROUTES.EMAIL_LINK}
        >
          <Button>{t(`toEmail-button-label`)}</Button>
        </Link>
      </p>
    </>
  );
};
export default FPCheckEmail;
