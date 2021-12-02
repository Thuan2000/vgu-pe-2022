import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import { ROUTES } from "@utils/routes";
import Link from "./ui/link";
import Button from "./ui/storybook/button";
import UnderConstructionIllustration from "@assets/under-construction-illustration.gif";

const UnderDevelopment = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center py-5 mx-5">
      <p className="mb-5 text-2xl">
        <strong className="text-semibold">{t("sorry-title")} :( </strong>
        {t("this-page-is-under-development-message")}
      </p>

      <div className="w-2/3">
        <Image
          className="my-5"
          src={UnderConstructionIllustration}
          objectFit="cover"
          alt={t("under-development")}
        />
      </div>

      <p className="my-5 text-xl">{t("will-available-soon-text")}</p>
      <Link href={ROUTES.HOMEPAGE} className="text-light">
        <Button size="small">{t("to-posted-request")}</Button>
      </Link>
    </div>
  );
};
export default UnderDevelopment;
