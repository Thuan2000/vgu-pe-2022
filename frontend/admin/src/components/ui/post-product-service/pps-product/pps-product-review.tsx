import Divider from "@components/ui/divider";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import React from "react";
import { useFormContext, UseFormGetValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PPSCategoryReview from "./pps-product-reviews/pps-product-category-review";
import PPSDetailsReview from "./pps-product-reviews/pps-product-details-review";
import { IPostProductFormValues } from "./pps-product-interface";
import PPSPricingReview from "./pps-product-reviews/pps-product-pricing-review";
import PPSGeneralReview from "./pps-product-reviews/pps-product-general-review";

interface IPPSProductReviewProps {
  changeSection: (t: number) => void;
}

const PPSProductReview: React.FC<IPPSProductReviewProps> = ({
  changeSection,
}) => {
  const { t } = useTranslation("form");
  const { getValues } = useFormContext<IPostProductFormValues>();
  return (
    <div>
      <Typography text={t("pps-review-note")} variant="description" />

      <div className="mt-5 space-y-5">
        <PPSCategoryReview
          changeSection={changeSection}
          category={getValues("category")}
        />
        <Divider />
        <PPSGeneralReview changeSection={changeSection} />
        <Divider />
        <PPSPricingReview
          changeSection={changeSection}
          pricing={getValues("pricing")}
        />
        <Divider />
        <PPSDetailsReview changeSection={changeSection} />
      </div>
    </div>
  );
};
export default PPSProductReview;
