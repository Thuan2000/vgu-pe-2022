import React from "react";

import {
  businessTypes,
  getBusinessType,
  getBusinessTypes,
} from "@datas/businessTypes";
import { ICompany } from "@graphql/types.graphql";
import { getYear, viDateFormat } from "@utils/functions";
import { useTranslation } from "next-i18next";
import CDDetailQuestion from "@components/ui/company-details/cd-detail-question-answer-item";
import Typography from "../storybook/typography";
import { getIndustry } from "@datas/industries";

interface ICDDetailsProps {
  company: ICompany;
}

const CDDetails: React.FC<ICDDetailsProps> = ({ company }) => {
  const { t } = useTranslation();
  const { settings } = company || {};

  function getIndustryText() {
    if (!company.industryId) return "";
    return t(`industry:${getIndustry(company.industryId).label}`);
  }

  function getNotSetupText() {
    return t("common:not-setup");
  }

  function getBusinessTypesText() {
    const bts = getBusinessTypes(company?.businessTypeIds as number[]);

    return bts.map((bt: any, idx: number) => {
      return `${t("business-type:" + bt.label)}, `;
    });
  }

  return (
    <div className={`col-span-2 border p-3 rounded-md space-y-1`}>
      <div className="mb-5 mt-2">
        <Typography
          variant="description"
          element="h3"
          size="md"
          text={t("companyInformation-title")}
          className="mb-2"
        />
        <Typography
          variant="description"
          element="p"
          size="md"
          text={company?.description || " "}
        />
      </div>

      <div>
        <div className="grid grid-cols-3">
          <div className="col-start-1">
            <CDDetailQuestion
              question={t("location-text")}
              answer={company?.location || ""}
            />
            <CDDetailQuestion
              question={t("yearOfEstablished-text")}
              answer={viDateFormat(company?.establishmentDate) + ""}
            />
            <CDDetailQuestion
              question={t("companyTotalEmployee-text")}
              answer={settings?.employeeAmount as number}
            />
            <CDDetailQuestion
              question={t("contactNumber-text")}
              answer={settings?.contactNumber as unknown as number}
            />
          </div>
          <div className="col-start-3">
            <CDDetailQuestion
              question={t("address-text")}
              answer={settings?.address as string}
            />
            <CDDetailQuestion
              question={t("industry-text")}
              answer={getIndustryText() || getNotSetupText()}
            />
            <CDDetailQuestion
              question={t("businessType-text")}
              answer={
                !!company?.businessTypeIds
                  ? getBusinessTypesText()
                  : getNotSetupText()
              }
            />
            <CDDetailQuestion
              question={t("mainProducts-text")}
              answer={settings?.mainProducts?.join(", ") as string}
            />
          </div>
        </div>
      </div>
      {/*SOCIAL MEDIA HERE*/}

      {/* <Typography
        text={t("share-label")}
        variant="BRTitle"
        size="md"
        className="mt-0.5"
      />
      <div className="flex">
        <FacebookIcon />
        <MessangerIcon className="ml-3" />
        <TelegramIcon className="ml-3" />
        <LinkIcon className="ml-3" />
      </div> */}
    </div>
  );
};
export default CDDetails;
