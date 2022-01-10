import ReviewQA from "@components/ui/review-qa";
import ReviewSectionTitle from "@components/ui/review-section-title";
import Typography from "@components/ui/storybook/typography";
import { isEmptyObject } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React from "react";
import { useFormContext } from "react-hook-form";
import { PPS_PRODUCT_DETAILS_FORM_INDEX } from "../pps-product-constants";
import {
  IPostProductFormValues,
  IPPSFDetailsSection,
} from "../pps-product-interface";
import PPSProductDimensionReview from "./pps-product-dimension-review";

interface IPPSDetailsReviewProps {
  changeSection: (id: number) => void;
}

const PPSDetailsReview: React.FC<IPPSDetailsReviewProps> = ({
  changeSection,
}) => {
  const { t } = useTranslation("form");

  const { getValues } = useFormContext<IPostProductFormValues>();
  const {
    brandName,
    baseDimension,
    isCustom,
    isPreorder,
    packagedDimension,
    status,
    tags,
    warranty,
  } = getValues("details") || {};

  function getTagNames() {
    return tags?.map((t) => t.name).join(", ");
  }

  return (
    <div className="sm:w-2/3">
      <ReviewSectionTitle
        onClick={() => changeSection(PPS_PRODUCT_DETAILS_FORM_INDEX)}
        title={t("details-nav-label")}
      />
      <div className="space-y-2 mt-2">
        <ReviewQA
          label={t("pps-product-brandName-review-label")}
          value={brandName || t("no-information-text")}
        />
        <ReviewQA
          label={t("pps-product-tags-review-label")}
          value={getTagNames() || t("no-information-text")}
        />
        {!!status.value && (
          <ReviewQA
            label={t("pps-product-status-review-label")}
            value={status?.value || t("no-information-text")}
          />
        )}
        <ReviewQA
          label={t("pps-product-isCustom-review-label")}
          value={isCustom + "" || t("no-information-text")}
        />

        {!isEmptyObject(packagedDimension) ||
          (!isEmptyObject(packagedDimension) && (
            <div>
              <Typography
                className="text-semibold"
                text={t("pps-product-transport-review-label")}
              />
              <div className={`grid grid-cols-2 gap-x-2`}>
                {!isEmptyObject(packagedDimension) && (
                  <PPSProductDimensionReview
                    title={t("pps-product-baseDimension-title")}
                    dimension={baseDimension}
                  />
                )}
                {!isEmptyObject(packagedDimension) && (
                  <PPSProductDimensionReview
                    title={t("pps-product-packagedDimension-title")}
                    dimension={packagedDimension}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default PPSDetailsReview;
