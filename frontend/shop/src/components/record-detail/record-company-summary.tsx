import React from "react";
import Image from "next/image";

import Typography from "@components/ui/storybook/typography";
import { ICompany } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";
import { siteSettings } from "@settings/site.settings";
import VerifiedIcon from "@assets/icons/verified-icon";
import DetailQA from "../ui/detail-qa";
import { getYear, viDateFormat } from "@utils/functions";
import {
  getBusinessType,
  getBusinessTypes,
  IBusinessType,
} from "@datas/businessTypes";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";

interface IRecordCompanySummaryProps {
  company: ICompany;
}

const RecordCompanySummary: React.FC<IRecordCompanySummaryProps> = ({
  company,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className={`general p-4 border space-y-4 relative rounded-md`}>
      <Typography
        text={t("brd-companySummary-title")}
        variant="title"
        size="md"
      />

      <div className="fic space-x-2">
        <Link
          target="_blank"
          rel="noreferrer"
          href={`${ROUTES.COMPANIES}/${company.slug}`}
        >
          <div className="w-12 h-12 relative rounded-full overflow-hidden">
            <Image
              // src={company.image.url}
              src={
                company.settings?.profileImage?.url ||
                siteSettings.imagePlaceholder
              }
              layout="fill"
              alt={company.name + "image-preview"}
            />
          </div>
        </Link>
        <div className="space-y-1">
          <div className="fic space-x-1">
            <Link
              target="_blank"
              rel="noreferrer"
              className={`border-b border-transparent hover:border-black pb-0.5 pr-1`}
              href={`${ROUTES.COMPANIES}/${company.slug}`}
            >
              <Typography variant="smallTitle" text={company.name} />
            </Link>
            <VerifiedIcon className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 space-y-2ssys">
        <DetailQA
          question={`${t("brd-companyExperience-title")}:`}
          answer={
            viDateFormat(company.establishmentDate) + "" || t("no-information")
          }
        />
        <DetailQA
          question={`${t("brd-businessType-title")}:`}
          answer={
            getBusinessTypes((company.businessTypeIds as number[]) || [])
              .map((bt: IBusinessType) => t("business-type:" + bt.label))
              .join(", ") || t("no-information")
          }
        />
        <DetailQA
          question={`${t("brd-employeeTotal-title")}:`}
          answer={
            (company.settings?.employeeAmount as any) || t("no-information")
          }
        />
        <DetailQA
          question={`${t("brd-mainProduct-title")}:`}
          answer={
            company.settings?.mainProducts?.join(", ") || t("no-information")
          }
        />
      </div>
    </div>
  );
};
export default RecordCompanySummary;
