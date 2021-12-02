import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import UnderConstructionIllustration from "@assets/phone-construction.webp";

interface IPleaseOpenOnLaptopProps {}

const PleaseOpenOnLaptop: React.FC<IPleaseOpenOnLaptopProps> = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center py-5 mx-5">
      <p className="mb-5 text-2xl">
        <strong className="text-semibold">{t("sorry-title")} :( </strong>
        {t("phone-view-not-ready-text")}
      </p>

      <div className="w-2/3">
        <Image
          className="my-5"
          src={UnderConstructionIllustration}
          objectFit="cover"
          alt={t("under-development")}
        />
      </div>

      <p className="my-5 text-xl">{t("please-open-on-laptop-text")}</p>
    </div>
  );
};
export default PleaseOpenOnLaptop;
