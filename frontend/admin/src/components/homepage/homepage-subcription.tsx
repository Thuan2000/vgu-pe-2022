import Typography from "@components/ui/storybook/typography";
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
        <div className="mr-4 text-left hidden md:block col-span-2 space-y-4">
          <Typography
            size="lg"
            text={`${t("company-subcription-label")}:`}
            className={`mt-4`}
          />
          <Typography
            size="xxl"
            weight="semibold"
            text={`${t("next-payment-date-label")}:`}
          />
          <Typography
            size="lg"
            text={`${t("company-subcription-note-label")}:`}
          />
        </div>
      </div>
    </div>
  );
};
export default HomepageSubcription;
