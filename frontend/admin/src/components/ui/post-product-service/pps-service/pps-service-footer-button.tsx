import Button from "@components/ui/storybook/button";
import { useTranslation } from "next-i18next";
import React from "react";
import { PPS_REVIEW_FORM_INDEX } from "./pps-service-constants";

interface IPPSServiceFooterButtonProps {
  onNextClick: () => void;
  formPosition: number;
  onBackClick: () => void;
  loading: boolean;
}

const PPSServiceFooterButton: React.FC<IPPSServiceFooterButtonProps> = ({
  onNextClick,
  formPosition,
  onBackClick,
  loading,
}) => {
  const { t } = useTranslation("form");

  return (
    <div className="flex flex-col justify-between relative md:h-10 w-full">
      {/* <Button
    type="button"
    variant="cancel"
    size="small"
    // onClick={onBackClick}
    className={`${formPosition <= 1 && "invisible hidden"} md:w-40`}
  >
    {t("saveDraft-button-label")}
  </Button> */}

      <div className="flex flex-col md:flex-row justify-between md:w-1/3 md:absolute md:right-0">
        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={onBackClick}
          className={`${
            formPosition <= 1 && "invisible hidden md:block"
          } md:w-1/2.5 my-2 md:my-0 text-primary`}
        >
          {t("back-button-label")}
        </Button>
        <Button
          type={formPosition < PPS_REVIEW_FORM_INDEX ? "button" : "submit"}
          onClick={onNextClick}
          size="small"
          className="md:w-1/2.5"
          loading={loading}
          autoFocus={formPosition === PPS_REVIEW_FORM_INDEX}
        >
          {t(
            formPosition === PPS_REVIEW_FORM_INDEX
              ? "post-service-button-label"
              : "next-section-button-label"
          )}
        </Button>
      </div>
    </div>
  );
};
export default PPSServiceFooterButton;
