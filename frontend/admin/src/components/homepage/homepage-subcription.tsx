import PostRequestAnimationIcon from "@assets/icons/post-request-animation-icon";
import InlineLabel from "@components/post-tender-form/inline-label";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { ROUTES } from "@utils/routes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface IHomepageSubcriptionProps {
  label: string;


  
}

const HomepageSubcription: React.FC<IHomepageSubcriptionProps> = ({
  label,

}) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="border border-gray-100 bg-green-300 rounded-sm justify-between p-3.5 cursor-pointer">
        <div className="ml-5 grid grid-cols-3">
          <div className="mr-4 text-left hidden md:block col-span-2">
            <p className=" text-lg my-4">{t("company-subcription-label")}: </p>
            <p className="font-semibold text-semibold text-3xl mb-4">{t("next-payment-date-label")}: </p>
            <Link href = {ROUTES.LOGOUT}>
              <p className="text-lg mb-4">{t("cancel-sub")}</p>
            </Link> 
          </div>
      </div>
    </div>
  );
};
export default HomepageSubcription;
