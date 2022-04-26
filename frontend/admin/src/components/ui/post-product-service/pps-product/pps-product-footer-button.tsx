import Button from "@components/ui/storybook/button";
import { useTranslation } from "next-i18next";
import React from "react";

export interface IPPSProductFooterButtonProps {
  onNextClick: () => void;
  formPosition: number;
  endPosition: number;
  onBackClick?: () => void;
  loading: boolean;
}

const PPSProductFooterButton: React.FC<IPPSProductFooterButtonProps> = ({
  onNextClick,
  formPosition,
  endPosition,
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
          type={formPosition < endPosition ? "button" : "submit"}
          onClick={onNextClick}
          size="small"
          className="md:w-1/2.5"
          loading={loading}
          autoFocus={formPosition === endPosition}
        >
          {t(
            formPosition === endPosition
              ? "post-record-button-label"
              : "next-section-button-label"
          )}
        </Button>
      </div>
    </div>
  );
};
export default PPSProductFooterButton;
