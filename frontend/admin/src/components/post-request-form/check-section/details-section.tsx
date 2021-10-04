import React from "react";
import { useTranslation } from "react-i18next";
import { DetailsFormValue } from "../post-request-schema";

interface IGeneralSection {
  formValues: DetailsFormValue;
  changeSection: (id: number) => void;
}

const DetailsSection: React.FC<IGeneralSection> = ({
  formValues,
  changeSection,
}) => {
  const { t } = useTranslation("form");
  return (
    <>
      <div className="flex justify-between mb-5">
        <h3>{t("details-information-title")}</h3>
        <p
          className="text-blue cursor-pointer"
          onClick={() => changeSection(2)}
        >
          {t("edit-label")}
        </p>
      </div>
      <div className="mb-5">
        <p className="text-dark-blue">{t("product-label")}</p>
        <p className="font-semibold">{formValues?.productName?.name}</p>
      </div>
      <div className="mb-5">
        <p className="text-dark-blue">{t("budget-label")}</p>
        <p className="font-semibold flex">
          <p className="mr-5">
            {formValues?.minBudget}
            {` ${t("budget-sign")}`}
          </p>
          {" - "}
          <p className="ml-5">
            {formValues?.maxBudget}
            {` ${t("budget-sign")}`}
          </p>
        </p>
      </div>
      <div className="mb-5">
        <p className="text-dark-blue">{t("maxBudget-label")}</p>
        <p className="font-semibold">{formValues?.maxBudget}</p>
      </div>
      <div className="mb-5">
        <p className="text-dark-blue">{t("minOrder-label")}</p>
        <p className="font-semibold">{formValues?.minOrder}</p>
      </div>
    </>
  );
};
export default DetailsSection;
