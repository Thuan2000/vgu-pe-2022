import VerifiedIcon from "@assets/icons/verified-icon";
import Chip from "@components/ui/storybook/chip";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React from "react";

interface ISDNameProps {
  name: string;
  companyName: string;
  createdAt: string;
}

const SDName: React.FC<ISDNameProps> = ({ name, companyName, createdAt }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography text={name} variant="BRTitle" />
      <div className="flex items-center space-x-1">
        <Typography text={companyName} variant="relatedCompanyName" />
        <VerifiedIcon className="w-4 h-4" />
      </div>
      <Typography
        variant="postedDate"
        text={`${t("postedAt-text")}: ${createdAt}`}
      />
    </div>
  );
};
export default SDName;
