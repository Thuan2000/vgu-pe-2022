import { PlusIcon } from "@assets/icons/plus-icon";
import SectionWrapper from "@components/ui/record-navigations/section-wrapper";
import Button from "@components/ui/storybook/button";
import InputLabel from "@components/ui/storybook/inputs/input-label";
import Typography from "@components/ui/storybook/typography";
import ValidationError from "@components/ui/storybook/validation-error";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { IPostProductFormValues } from "./pps-product-interface";
import PPSPVPInput from "./ppsp-variation-price/pppspvp-input";
import ProductGroupInput from "./product-group-input";
import ProductSinglePriceInput from "./product-single-price-input";

interface IPPSProductPricingInputProps {}

export function AddButton({ onClick, label }: any) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      color="secondary-1"
      className="hover:bg-secondary-1-hover"
    >
      <PlusIcon fill={COLORS["SECONDARY-1"].DEFAULT} className="w-3 h-3 mr-2" />
      {label}
    </Button>
  );
}

const PPSProductPricingInput = React.forwardRef<
  HTMLTableSectionElement,
  IPPSProductPricingInputProps
>(({}, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IPostProductFormValues>();
  const { t } = useTranslation("form");

  const groups: any = useWatch<IPostProductFormValues>({
    control,
    name: "pricing.groups",
  }) as any;

  const pricingError = errors?.pricing;

  function hasPricingError() {
    return pricingError?.price || pricingError?.variations;
  }

  return (
    <SectionWrapper sectionTitle={t("pricing-nav-label")} ref={ref}>
      <div className={`space-y-5 ${!groups?.length && "pb-48"}`}>
        <div className="space-y-2">
          <InputLabel
            label={t("product-price-input-label")}
            required={true}
            labelFontSize={"md"}
          />
          {!groups?.length && (
            <ProductSinglePriceInput control={control} name="pricing.price" />
          )}
          <ProductGroupInput control={control} name="pricing.groups" />
          <PPSPVPInput control={control} name="pricing.variations" />
          {/* @TODO: Make this available asap */}
          {/* <PPSPVIInput control={control} name="pricing.variations" /> */}
        </div>
        <div>
          <ValidationError
            message={
              hasPricingError()
                ? t((pricingError?.variations as any)?.message || "") ||
                  t((pricingError?.price as any)?.message || "")
                : ""
            }
          />
        </div>
      </div>
    </SectionWrapper>
  );
});

export default PPSProductPricingInput;
