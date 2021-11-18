import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React from "react";
import { IPPSFCategorySection } from "../pps-service-interface";
import ReviewQA from "../../../review-qa";
import ReviewSectionTitle from "../../../review-section-title";

interface IPPSCategoryReviewProps {
  category: IPPSFCategorySection;
  changeSection: (id: number) => void;
}

const PPSCategoryReview: React.FC<IPPSCategoryReviewProps> = ({
  category,
  changeSection,
}) => {
  const { t } = useTranslation("form");

  function getIndustryCategoryValue() {
    return `${t("industry:" + category?.industry?.label)} > ${t(
      "category:" + category?.category?.label
    )}`;
  }

  return (
    <div className="sm:w-2/3">
      <ReviewSectionTitle
        onClick={() => changeSection(1)}
        title={t("category-nav-label")}
      />
      <div className="space-y-2 mt-2">
        <ReviewQA label={t("pps-review-service-name")} value={category?.name} />
        <ReviewQA
          label={t("pps-review-service-industryCategory")}
          value={getIndustryCategoryValue()}
        />
      </div>
    </div>
  );
};
export default PPSCategoryReview;
