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
  const { t } = useTranslation("form");

  function isHaveParticipantFilter() {
    return formValues?.allowedCompany?.length > 1;
  }

  function isHaveAdditional() {
    return isHaveParticipantFilter() || formValues.categories;
  }

  function getParticipantFilter() {
    let text = "";
    console.log(formValues?.allowedCompany);
    formValues?.allowedCompany?.map((fi: any) => {
      if (!fi?.key) return;
      text += `${t("company-with-label")} ${fi?.value} ${t(
        fi?.key?.value + "-filter-key"
      )}, `;
    });
    return text;
  }

  if (!isHaveAdditional()) return <></>;

  return (
    <>
      <Divider className="mb-7" />
      <div className={`flex justify-between mb-5 ${hasImage && "md:w-2/3"}`}>
        <h3>{t("additional-information-check-title")}</h3>
        <p
          className="text-blue cursor-pointer"
          onClick={() => changeSection(2)}
        >
          {t("edit-label")}
        </p>
      </div>
      {isHaveParticipantFilter() && (
        <div className="mb-5">
          <p className="text-semibold">{t("check-participantFilter-label")}</p>
          <p className="font-semibold">{getParticipantFilter()}</p>
        </div>
      )}
      {formValues?.categories?.length > 0 && (
        <div className="mb-5">
          <p className="text-semibold">{t("check-categories-label")}</p>
          <div className="flex items-center">
            {formValues.categories.map((category, idx) => (
              <p
                className="font-semibold mr-1"
                key={`${category.name}-"category-additional-section"`}
              >
                {category.name}
                {idx < formValues?.categories?.length - 1 && ", "}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default AdditionalSection;
