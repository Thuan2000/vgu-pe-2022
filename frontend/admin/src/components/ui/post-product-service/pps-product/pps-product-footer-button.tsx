import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import React from "react";
import { PPS_PRODUCT_REVIEW_FORM_INDEX } from "./pps-product-constants";

interface IPPSProductFooterButtonProps {
  onNextClick: () => void;
  formPosition: number;
  onBackClick?: () => void;
  loading: boolean;
}

const PPSProductFooterButton: React.FC<IPPSProductFooterButtonProps> = ({
  onNextClick,
  formPosition,
  onBackClick,
  loading,
}) => {
  const { t } = useTranslation("form");

  return (
    <div className="flex flex-col justify-between relative md:h-10 w-full">
      <div className="flex flex-col justify-between md:flex-row md:w-1/3 md:absolute right-0 md:justify-end space-x-4">
        {!!onBackClick && (
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={onBackClick}
            className="w-full md:w-1/2.5 hover:bg-secondary-1-hover border-secondary-1-hover text-secondary-1-hover"
          >
            {t("back-button-label")}
          </Button>
        )}
        <Button
          type={
            formPosition < PPS_PRODUCT_REVIEW_FORM_INDEX ? "button" : "submit"
          }
          onClick={onNextClick}
          size="small"
          className="md:w-1/2.5"
          loading={loading}
          autoFocus={formPosition === PPS_PRODUCT_REVIEW_FORM_INDEX}
        >
          {t(
            formPosition === PPS_PRODUCT_REVIEW_FORM_INDEX
              ? "post-product-button-label"
              : "next-section-button-label"
          )}
        </Button>
      </div>
    </div>
  );
};
export default PPSProductFooterButton;
