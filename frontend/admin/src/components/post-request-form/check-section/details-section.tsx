import { BILLION } from "@utils/constants";
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
        <p className="font-semibold">{formValues?.productName?.name}</p>
      </div>
      <div className="mb-5">
        <p className="text-semibold">{t("budget-label")}</p>
        <p className="font-semibold flex">
          <p className="mr-5">
            {formatMoneyAmount(formValues?.minBudget)}
            {`${t("common:" + getSuffix(formValues?.maxBudget))} ${t(
              "budget-sign"
            )}`}
          </p>
          {" - "}
          <p className="ml-5">
            {formatMoneyAmount(formValues?.maxBudget)}
            {`${t("common:" + getSuffix(formValues?.maxBudget))} ${t(
              "budget-sign"
            )}`}
          </p>
        </p>
      </div>
      <div className="mb-5">
        <p className="text-semibold">{t("minOrder-label")}</p>
        <p className="font-semibold">
          {formValues?.minOrder} {formValues?.unit}
        </p>
      </div>
    </>
  );
};
export default DetailsSection;
