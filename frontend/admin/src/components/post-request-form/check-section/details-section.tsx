import { formatMoneyAmount, getSuffix } from "@utils/functions";
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
    categories,
    industry,
    maxBudget,
    minBudget,
    minOrder,
    productName,
    unit,
  } = formValues || {};

  const { t } = useTranslation("form");

  return (
    <>
      <div className={`flex justify-between mb-5 ${hasImage && "md:w-2/3"}`}>
        <h3>{t("details-information-title")}</h3>
        <p
          className="text-blue cursor-pointer"
          onClick={() => changeSection(2)}
        >
          {t("edit-label")}
        </p>
      </div>
      <div className="mb-5">
        <p className="text-semibold">{t("product-label")}</p>
        <p className="font-semibold">
          {typeof productName === "string" ? productName : productName?.name}
        </p>
      </div>
      <div className="mb-5">
        <p className="text-semibold">{t("budget-label")}</p>
        <p className="font-semibold flex">
          <span className="mr-5">
            {formatMoneyAmount(minBudget)}
            {`${t("common:" + getSuffix(minBudget))} ${t("budget-sign")}`}
          </span>
          {" - "}
          <span className="ml-5">
            {formatMoneyAmount(maxBudget)}
            {`${t("common:" + getSuffix(maxBudget))} ${t("budget-sign")}`}
          </span>
        </p>
      </div>
      <div className="mb-5">
        <p className="text-semibold">{t("minOrder-label")}</p>
        <p className="font-semibold">
          {minOrder} {unit}
        </p>
      </div>
      <div className="mb-5">
        <p className="text-semibold">{t("check-industry-label")}</p>
        <p className="font-semibold">{t("industry:" + industry?.label)}</p>
      </div>

      {categories?.length > 0 && (
        <div className="mb-5">
          <p className="text-semibold">{t("check-categories-label")}</p>
          <div className="flex items-center flex-wrap">
            {categories.map((category, idx) => (
              <p
                className="font-semibold mr-1"
                key={`${category.label}-"category-additional-section"`}
              >
                {t("category:" + category.label)}
                {idx < categories?.length - 1 && ", "}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default DetailsSection;
