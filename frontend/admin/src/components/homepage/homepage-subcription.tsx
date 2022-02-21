import React from "react";
import { useTranslation } from "react-i18next";

interface IHomepageSubcriptionProps {
  label: string;  
}

const HomepageSubcription: React.FC<IHomepageSubcriptionProps> = ({
  label,

}) => {
  const { t } = useTranslation();
  return (
    <div className="border border-gray-100 bg-green-300 rounded-sm justify-between p-3.5 cursor-pointer">
        <div className="ml-5 grid grid-cols-3">
          <div className="mr-4 text-left hidden md:block col-span-2">
            <p className=" text-lg my-4">{t("company-subcription-label")}: </p>
            <p className="font-semibold text-semibold text-3xl mb-4">{t("next-payment-date-label")}: </p>
          </div>
      </div>
    </div>
  );
};
export default HomepageSubcription;
