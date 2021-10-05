import Divider from "@components/ui/divider";
import { useTranslation } from "next-i18next";
import React from "react";
import { AdditionalFormValue } from "../post-request-schema";

interface IAdditionalSectionProps {
  formValues: AdditionalFormValue;
  changeSection: (id: number) => void;
  hasImage: boolean;
}

const AdditionalSection: React.FC<IAdditionalSectionProps> = ({
  formValues,
  hasImage,
  changeSection,
}) => {
  const { t } = useTranslation();

  function isHaveParticipantFilter() {
    return (
      formValues.minSuplierSells ||
      formValues.minSupplierExperience ||
      formValues.minSupplierRating
    );
  }

  function isHaveAdditional() {
    return isHaveParticipantFilter() || formValues.categories;
  }

  function getMinRating() {
    if (!formValues?.minSupplierRating) return "";
    return ` ${t("suppliers-with-word")} ${formValues?.minSupplierRating} ${t(
      "rating-word"
    )}, `;
  }

  function getMinExperience() {
    if (!formValues?.minSupplierExperience) return "";
    return `${t("suppliers-with-word")} ${
      formValues?.minSupplierExperience
    } ${t("experience-word")}, `;
  }

  function getMinSuplierSells() {
    if (!formValues?.minSuplierSells) return "";
    return `${t("suppliers-with-word")} ${formValues?.minSuplierSells} ${t(
      "sells-word"
    )}, `;
  }

  if (!isHaveAdditional()) return <></>;

  return (
    <>
      <Divider className="mb-7" />
      <div className={`flex justify-between mb-5 ${hasImage && "md:w-2/3"}`}>
        <h3>{t("general-information-check-title")}</h3>
        <p
          className="text-blue cursor-pointer"
          onClick={() => changeSection(2)}
        >
          {t("edit-label")}
        </p>
      </div>
      {isHaveParticipantFilter() && (
        <div className="mb-5">
          <p className="text-dark-blue">{t("check-participantFilter-label")}</p>
          <p className="font-semibold">
            {getMinRating()}
            {getMinExperience()}
            {getMinSuplierSells()}
          </p>
        </div>
      )}
      {formValues?.categories?.length > 0 && (
        <div className="mb-5">
          <p className="text-dark-blue">{t("check-categories-label")}</p>
          {formValues.categories.map((cetegory) => (
            <p
              className="font-semibold"
              key={cetegory.label + "category-additional-section"}
            >
              {cetegory.label}
            </p>
          ))}
        </div>
      )}
    </>
  );
};
export default AdditionalSection;
