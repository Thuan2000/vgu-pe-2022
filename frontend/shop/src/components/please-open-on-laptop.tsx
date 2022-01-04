import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import UnderConstructionIllustration from "@assets/phone-construction.webp";

interface IPleaseOpenOnLaptopProps {}

const PleaseOpenOnLaptop: React.FC<IPleaseOpenOnLaptopProps> = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex h-screen mt-28">
      <div className = "flex flex-col">
        <div className="w-full">
          <Image
            className=""
            src={UnderConstructionIllustration}
            objectFit="cover"
            alt={t("under-development")}
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center mb-32">
            <p className="md:w-32 lg:w-48 text-3xl font-bold text-center">{t("phone-view-not-ready-text")}</p>
            <p className="flex justify-center my-2 text-xl z-20 text-center">{t("please-open-on-laptop-text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PleaseOpenOnLaptop;
