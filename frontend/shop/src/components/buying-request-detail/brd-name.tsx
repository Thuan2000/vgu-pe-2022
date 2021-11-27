import VerifiedIcon from "@assets/icons/verified-icon";
import Chip from "@components/ui/storybook/chip";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React from "react";

interface IBRDNameProps {
  name: string;
  companyName: string;
  createdAt: string;
  status: string;
}

const BRDName: React.FC<IBRDNameProps> = ({
  name,
  companyName,
  createdAt,
  status,
}) => {
  const { t } = useTranslation("common");

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
      <div className="flex mt-1">
        <Chip
          text={t(status)}
          background={status === "CLOSE" ? "error" : "secondary-1"}
        />
      </div>
    </div>
  );
};
export default BRDName;
