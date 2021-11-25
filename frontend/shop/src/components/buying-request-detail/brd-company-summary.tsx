import React from "react";
import Image from "next/image";

import Typography from "@components/ui/storybook/typography";
import { ICompany } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";
import { siteSettings } from "@settings/site.settings";
import VerifiedIcon from "@assets/icons/verified-icon";
import BRDDetailQA from "./brd-detail-qa";

interface IBRDCompanySummaryProps {
  company: ICompany;
}

const BRDCompanySummary: React.FC<IBRDCompanySummaryProps> = ({ company }) => {
  const { t } = useTranslation("common");

  return (
    <div className={`general p-4 border space-y-4 relative rounded-md`}>
      <Typography
        text={t("brd-companySummary-title")}
        variant="title"
        size="md"
      />

      <div className="fic space-x-2">
        <div className="w-12 h-12 relative">
          <Image
            // src={company.image.url}
            src={siteSettings.imagePlaceholder}
            layout="fill"
          />
        </div>

        <div className="space-y-1">
          <div className="fic space-x-1">
            <Typography variant="smallTitle" text={company.name} />
            <VerifiedIcon className="w-5 h-5" />
          </div>
          <Typography variant="smallTitle" text={company.name} />
        </div>
      </div>

      <div
        className="grid grid-cols-2 space-y-2
      "
      >
        <BRDDetailQA
          question={`${t("brd-companyExperience-title")}:`}
          // answer={company.establishment}
          answer={"2021"}
        />
        <BRDDetailQA
          question={`${t("brd-businessType-title")}:`}
          // answer={company.businessType}
          answer={"Manufacturer, Trading Company"}
        />
        <BRDDetailQA
          question={`${t("brd-employeeTotal-title")}:`}
          // answer={company.employees.length}
          answer="50 Peoples"
        />
        <BRDDetailQA
          question={`${t("brd-mainProduct-title")}:`}
          // answer={company.mainProduct}
          answer="H Beam/Wire Rod/Galvanized Wire/Steel"
        />
      </div>
    </div>
  );
};
export default BRDCompanySummary;
