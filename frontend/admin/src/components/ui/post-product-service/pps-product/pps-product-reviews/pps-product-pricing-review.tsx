import ReviewQA from "@components/ui/review-qa";
import ReviewSectionTitle from "@components/ui/review-section-title";
import PPIPackageList from "@components/ui/storybook/inputs/package-pricing-input/ppi-package-list";
import { packagePriceRow } from "@components/ui/storybook/inputs/package-pricing-input/ppi-package-manager";
import PPIRowList from "@components/ui/storybook/inputs/package-pricing-input/ppi-row-list";
import Typography from "@components/ui/storybook/typography";
import {
  formatMoneyAmount,
  getMoneySuffix,
  thousandSeparator,
} from "@utils/functions";
import { useTranslation } from "next-i18next";
import React from "react";
import { useFormContext } from "react-hook-form";
import { PPS_PRODUCT_PRICING_FORM_INDEX } from "../pps-product-constants";
import {
  IPostProductFormValues,
  IPPSFPricingSection,
} from "../pps-product-interface";
import VariationPriceInputItemWrapper from "../ppsp-variation-price/variation-price-input-item-wrapper";

interface IPPSPricingReviewProps {
  pricing: IPPSFPricingSection;
  changeSection: (id: number) => void;
}

const PPSPricingReview: React.FC<IPPSPricingReviewProps> = ({
  pricing,
  changeSection,
}) => {
  const { getValues } = useFormContext<IPostProductFormValues>();
  const variants = getValues("pricing.variations");

  function isHaveVariants() {
    return !!variants?.length;
  }

  const { t } = useTranslation("form");

  return (
    <div className="sm:w-2/3">
      <ReviewSectionTitle
        onClick={() => changeSection(PPS_PRODUCT_PRICING_FORM_INDEX)}
        title={t("pricing-nav-label")}
      />

      {!isHaveVariants() ? (
        <ReviewQA
          label={t("pps-product-singlePrice-label")}
          value={`${formatMoneyAmount(pricing?.price)}${t(
            getMoneySuffix(pricing?.price)
          )} ${t("budget-sign")}`}
        />
      ) : (
        <div>
          <Typography
            className="text-semibold"
            text={t("product-variants-title")}
          />

          <div className={`w-full`}>
            <div className={`fic`}>
              <VariationPriceInputItemWrapper isLeftSide isHeader>
                <Typography
                  weight="semibold"
                  text={t("variation-text-title")}
                />
              </VariationPriceInputItemWrapper>
              <VariationPriceInputItemWrapper isRightSide isHeader>
                <Typography weight="semibold" text={t("price-text-title")} />
              </VariationPriceInputItemWrapper>
            </div>
            {variants?.map(({ id, title, price }, idx) => {
              const isLast = idx === variants.length - 1;
              return (
                <div key={title + price} className={`fic`}>
                  <VariationPriceInputItemWrapper isFooter={isLast} isLeftSide>
                    <Typography text={title} />
                  </VariationPriceInputItemWrapper>
                  <VariationPriceInputItemWrapper isFooter={isLast} isRightSide>
                    <Typography
                      text={thousandSeparator(price + " ") + t("budget-sign")}
                    />
                  </VariationPriceInputItemWrapper>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default PPSPricingReview;
