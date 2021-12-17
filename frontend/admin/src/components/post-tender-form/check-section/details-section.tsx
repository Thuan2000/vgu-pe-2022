import LTEIcon from "@assets/icons/lte-icon";
import {
  formatMoneyAmount,
  getMoneySuffix,
  viDateFormat,
} from "@utils/functions";
import React from "react";
import { useTranslation } from "react-i18next";
import { DetailsFormValue } from "../post-request-schema";

interface IGeneralSection {
  formValues: DetailsFormValue;
  changeSection: (id: number) => void;
  hasImage: boolean;
}

const DetailsSection: React.FC<IGeneralSection> = ({
  formValues,
  changeSection,
  hasImage,
}) => {
  const {
    endDate,
    location,
    sourceType,
    maxBudget,
    minBudget,
    minOrder,
    allowedCompany,
    unit,
  } = formValues || {};

  const { t } = useTranslation("form");

  function isHaveAllowedCompanyFilter() {
    if (!allowedCompany) return false;
    let isHave = false;
    Object.keys(allowedCompany).forEach((e) => {
      if (!!(allowedCompany as any)[e]) isHave = true;
    });

    return isHave;
  }

  return (
    <div className="space-y-3">
      <div className={`flex justify-between ${hasImage && "md:w-2/3"}`}>
        <h3>{t("details-information-title")}</h3>
        <p
          className="text-blue cursor-pointer"
          onClick={() => changeSection(2)}
        >
          {t("edit-label")}
        </p>
      </div>

      <div>
        <p className="font-semibold">{t("budget-label")}</p>
        <p className=" flex">
          <span className="mr-5">
            {formatMoneyAmount(minBudget)}
            {`${t("common:" + getMoneySuffix(minBudget))} ${t("budget-sign")}`}
          </span>
          {" - "}
          <span className="ml-5">
            {formatMoneyAmount(maxBudget)}
            {`${t("common:" + getMoneySuffix(maxBudget))} ${t("budget-sign")}`}
          </span>
        </p>
      </div>
      <div>
        <p className="font-semibold text-semibold">{t("minOrder-label")}</p>
        <p className="">
          {minOrder} {unit}
        </p>
      </div>

      <div>
        <p className="text-semibold font-semibold">
          {t("check-dueTime-label")}
        </p>
        <p className="">{viDateFormat(endDate?.getTime())}</p>
      </div>

      <div>
        <p className="text-semibold font-semibold">
          {t("check-location-label")}
        </p>
        <p className="">
          {typeof location === "string" ? location : location?.name}
        </p>
      </div>

      {isHaveAllowedCompanyFilter() && (
        <div>
          <p className="font-semibold text-semibold">
            {t("check-participantFilter-label")}
          </p>
          {!!allowedCompany?.minSupplierExperience && (
            <p className="flex space-x-1">
              <span>{t("minSupplierExperience-filter-key")}:</span>
              <span className="flex items-center">
                <LTEIcon className="mr-1" />
                {allowedCompany?.minSupplierExperience}
              </span>
              <span>{t("experience-suffix-years")}</span>
            </p>
          )}
          {!!allowedCompany?.minSupplierSells && (
            <p className="flex space-x-1">
              <span>{t("minSupplyQuantity-filter-label")}:</span>
              <span className="flex items-center">
                {allowedCompany?.minSupplierSells}
              </span>
              <span>{t("minSupplierSuffix-label")}</span>
            </p>
          )}
        </div>
      )}

      {!!sourceType && (
        <div>
          <p className="text-semibold font-semibold">
            {t("check-sourceType-label")}
          </p>
          <p className="">{t("source-type:" + sourceType?.label)}</p>
        </div>
      )}
    </div>
  );
};
export default DetailsSection;
