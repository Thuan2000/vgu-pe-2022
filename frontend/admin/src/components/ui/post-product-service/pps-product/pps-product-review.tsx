import Divider from "@components/ui/divider";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import React from "react";
import { UseFormGetValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PPSCategoryReview from "./pps-product-reviews/pps-product-category-review";
import PPSDetailsReview from "./pps-product-reviews/pps-product-details-review";
import PPSAttachmentReview from "./pps-product-reviews/pps-product-attachment-review";
import { IPostProductFormValues } from "./pps-product-interface";
import PPSPricingReview from "./pps-product-reviews/pps-product-pricing-review";

interface IPPSProductReviewProps {
  changeSection: (t: number) => void;
  getValues: UseFormGetValues<IPostProductFormValues>;
}

const PPSProductReview: React.FC<IPPSProductReviewProps> = ({
  changeSection,
  getValues,
}) => {
  const { t } = useTranslation("form");
  return (
    <div>
      <Typography text={t("pps-review-note")} variant="description" />

      <div className="mt-5 space-y-5">
        <PPSCategoryReview
          changeSection={changeSection}
          category={getValues("category")}
        />
        <Divider />
        <PPSDetailsReview
          changeSection={changeSection}
          details={getValues("details")}
        />
        <Divider />
        <PPSAttachmentReview
          changeSection={changeSection}
          attachment={getValues("attachment")}
        />
        <Divider />
        <PPSPricingReview
          changeSection={changeSection}
          pricing={getValues("pricing")}
        />
      </div>
    </div>
  );
};
export default PPSProductReview;
