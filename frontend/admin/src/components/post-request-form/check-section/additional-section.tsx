import Divider from "@components/ui/divider";
import { thousandSeparator } from "@utils/functions";
import { isString } from "lodash";
import { useTranslation } from "next-i18next";
import React from "react";
import { AdditionalFormValue } from "../post-request-schema";

interface IAdditionalSectionProps {
  formValues: AdditionalFormValue;
  changeSection: (id: number) => void;
  hasImage: boolean;
}

const AdditionalSection: React.FC<IAdditionalSectionProps> = ({
  formValues: { allowedCompany },
  hasImage,
  changeSection,
}) => {
  const { t } = useTranslation("form");

  function isHaveParticipantFilter() {
    return allowedCompany && allowedCompany?.length > 1;
  }

  function isHaveAdditional() {
    return isHaveParticipantFilter();
  }

  function getParticipantFilter() {
    let text = "";
    allowedCompany?.map((fi: any) => {
      if (!fi?.key) return;
      text += `${t("company-with-label")} ${thousandSeparator(fi?.value)} ${t(
        isString(fi?.key)
          ? fi?.key + "-filter-key"
          : fi?.key?.value + "-filter-key"
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
    </>
  );
};
export default AdditionalSection;
