import { useTranslation } from "next-i18next";
import React from "react";
import { IPPSFGeneralSection } from "../pps-service-interface";
import ReviewQA from "../../../review-qa";
import ReviewSectionTitle from "../../../review-section-title";

interface IPPSGeneralReviewProps {
  general: IPPSFGeneralSection;
  changeSection: (id: number) => void;
}

const PPSGeneralReview: React.FC<IPPSGeneralReviewProps> = ({
  general,
  changeSection,
}) => {
  const { t } = useTranslation("form");

  function getIndustryCategoryValue() {
    return `${t("industry:" + general?.industry?.label)} > ${t(
      "category:" + general?.category?.label
    )}`;
  }

  return (
    <div className="sm:w-2/3">
      <ReviewSectionTitle
        onClick={() => changeSection(1)}
        title={t("category-nav-label")}
      />
      <div className="space-y-2 mt-2">
        <ReviewQA label={t("pps-review-service-name")} value={general?.name} />
        <ReviewQA
          label={t("pps-review-service-description")}
          isDescription
          value={general?.description}
        />
        <ReviewQA
          label={t("pps-serviceLocation-review-label")}
          value={general?.location?.name}
        />
        <ReviewQA
          label={t("pps-review-service-industryCategory")}
          value={getIndustryCategoryValue()}
        />
      </div>
    </div>
  );
};
export default PPSGeneralReview;
