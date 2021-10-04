import { useTranslation } from "next-i18next";
import React from "react";
import { GeneralFormValue } from "../post-request-schema";

interface IGeneralSection {
  formValues: GeneralFormValue;
  changeSection: (id: number) => void;
}

const GeneralSection: React.FC<IGeneralSection> = ({
  formValues,
  changeSection,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between mt-7 mb-5">
        <h3>{t("general-information-check-title")}</h3>
        <p
          className="text-blue cursor-pointer"
          onClick={() => changeSection(2)}
        >
          {t("edit-label")}
        </p>
      </div>
      <div className="mb-5">
        <p className="text-dark-blue">{t("check-request-name")}</p>
        <p className="font-semibold">{formValues?.name}</p>
      </div>
      <div className="mb-5">
        <p className="text-dark-blue">{t("check-dueTime-label")}</p>
        <p className="font-semibold">{formValues?.endDate}</p>
      </div>
      <div className="mb-5">
        <p className="text-dark-blue">{t("check-location-label")}</p>
        <p className="font-semibold">{formValues?.location?.name}</p>
      </div>
      {formValues?.description && (
        <div className="mb-5">
          <p className="text-dark-blue">{t("check-desctiption-label")}</p>
          <p className="font-semibold">{formValues?.description}</p>
        </div>
      )}
    </>
  );
};
export default GeneralSection;
