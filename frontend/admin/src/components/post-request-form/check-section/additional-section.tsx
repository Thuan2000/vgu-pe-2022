import Divider from "@components/ui/divider";
import { thousandSeparator } from "@utils/functions";
import { isEmpty, isString } from "lodash";
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
    return !isEmpty(allowedCompany);
  }

  function isHaveAdditional() {
    return isHaveParticipantFilter();
  }

  function getParticipantFilter() {
    if (!allowedCompany || isEmpty(allowedCompany)) return "";
    let text = "";
    Object.keys(allowedCompany)?.map((fi: any) => {
      if (!fi) return;
      text += `${t("company-with-label")} ${thousandSeparator(
        (allowedCompany as any)[fi] as any
      )} ${t(fi + "-filter-key")}, `;
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
          <p className="font-semibold flex-wrap">{getParticipantFilter()}</p>
        </div>
      )}
    </>
  );
};
export default AdditionalSection;
