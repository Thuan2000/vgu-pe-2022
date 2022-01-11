import React from "react";

import {
  businessTypes,
  getBusinessType,
  getBusinessTypes,
} from "@datas/businessTypes";
import { ICompany } from "@graphql/types.graphql";
import { getYear } from "@utils/functions";
import { useTranslation } from "next-i18next";
import CDDetailQuestion from "@components/ui/company-details/cd-detail-question-answer-item";
import Typography from "../storybook/typography";

interface ICDDetailsProps {
  company: ICompany;
}

const CDDetails: React.FC<ICDDetailsProps> = ({ company }) => {
  const { t } = useTranslation();
  const { settings } = company || {};

  function getBusinessTypesText() {
    const bts = getBusinessTypes(company?.businessTypeIds as number[]);

    return bts
      .map((bt: any, idx: number) => t("business-type:" + bt.label))
      .join(", ");
  }

  return (
    <div className={`col-span-2 border p-3 rounded-md space-y-1`}>
      <Typography
        variant="smallTitle"
        element="h3"
        size="md"
        text={t("companyDetails-title")}
      />

      <CDDetailQuestion
        question={t("location-text")}
        answer={company.location || ""}
      />
      <CDDetailQuestion
        question={t("yearOfEstablished-text")}
        answer={getYear(company.establishmentDate) + ""}
      />
      <CDDetailQuestion
        question={t("totalEmployees-text")}
        answer={settings?.employeeAmount as number}
      />
      <CDDetailQuestion
        question={t("businessType-text")}
        answer={
          !!company.businessTypeIds
            ? getBusinessTypesText()
            : (t("common:not-setup") as string)
        }
      />
      <CDDetailQuestion
        question={t("mainProducts-text")}
        answer={settings?.mainProducts?.join(", ") as string}
      />
    </div>
  );
};
export default CDDetails;
