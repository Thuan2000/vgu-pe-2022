import Divider from "@components/ui/divider";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import React from "react";
import { useFormContext, UseFormGetValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PPSGeneralReview from "./pps-service-reviews/pps-service-general-review";
import PPSDetailsReview from "./pps-service-reviews/pps-service-details-review";
import PPSAttachmentReview from "./pps-service-reviews/pps-service-attachment-review";
import { IPostServiceFormValues } from "./pps-service-interface";
import PPSPricingReview from "./pps-service-reviews/pps-service-pricing-review";

interface IPPSServiceReviewProps {
  changeSection: (t: number) => void;
}

const PPSServiceReview: React.FC<IPPSServiceReviewProps> = ({
  changeSection,
}) => {
  const { t } = useTranslation("form");

  const { getValues } = useFormContext<IPostServiceFormValues>();

  return (
    <div>
      <Typography text={t("pps-review-note")} variant="description" />

      <div className="mt-5 space-y-5">
        <PPSGeneralReview
          changeSection={changeSection}
          general={getValues("general")}
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
export default PPSServiceReview;
