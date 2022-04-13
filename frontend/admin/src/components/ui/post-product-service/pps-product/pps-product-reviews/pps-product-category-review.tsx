import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React from "react";
import { IPPSFCategorySection } from "../pps-product-interface";
import ReviewQA from "../../../review-qa";
import ReviewSectionTitle from "../../../review-section-title";
import { PPS_PRODUCT_CATEGORY_FORM_INDEX } from "../pps-product-constants";
import { useModal } from "src/contexts/modal.context";

interface IPPSCategoryReviewProps {
  category: IPPSFCategorySection;
  changeSection: (id: number) => void;
}

const PPSCategoryReview: React.FC<IPPSCategoryReviewProps> = ({
  category,
  changeSection,
}) => {
  const { t } = useTranslation("form");
  const { openModal } = useModal();

  function getIndustryCategoryValue() {
    return `${t("industry:" + category?.industry?.label)} > ${t(
      "category:" + category?.category?.label
    )}`;
  }

  function openPostProduct() {}

  return (
    <div className="sm:w-2/3">
      <ReviewSectionTitle
        onClick={() => changeSection(PPS_PRODUCT_CATEGORY_FORM_INDEX)}
        title={t("category-nav-label")}
      />
      <div className="space-y-2 mt-2">
        <ReviewQA label={t("pps-review-product-name")} value={category?.name} />
        <ReviewQA
          label={t("pps-review-product-industryCategory")}
          value={getIndustryCategoryValue()}
        />
      </div>
    </div>
  );
};
export default PPSCategoryReview;
