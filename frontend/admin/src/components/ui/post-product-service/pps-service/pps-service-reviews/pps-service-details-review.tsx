import ReviewQA from "@components/ui/review-qa";
import ReviewSectionTitle from "@components/ui/review-section-title";
import FAQList from "@components/ui/storybook/inputs/faq-input/faq-list";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React from "react";
import { IPPSFDetailsSection } from "../pps-service-interface";

interface IPPSDetailsReviewProps {
  details: IPPSFDetailsSection;
  changeSection: (id: number) => void;
}

const PPSDetailsReview: React.FC<IPPSDetailsReviewProps> = ({
  details,
  changeSection,
}) => {
  const { t } = useTranslation("form");

  function getTags() {
    let text = "";
    details?.tags.forEach((t, idx) => {
      text += `${idx > 0 ? ", " : ""}${t.name}`;
    });

    return text;
  }

  return (
    <div className="sm:w-2/3">
      <ReviewSectionTitle
        onClick={() => changeSection(2)}
        title={t("details-nav-label")}
      />
      <div className="space-y-2 mt-2">
        <ReviewQA
          label={t("pps-serviceLocation-review-label")}
          value={details?.location?.name}
        />
        <ReviewQA
          label={t("pps-serviceLocation-review-label")}
          value={getTags()}
        />

        {details?.faqs?.length > 0 && (
          <>
            <Typography
              className="text-semibold"
              text={t("pps-serviceFaqs-review-label")}
            />
            <FAQList faqs={details?.faqs} />
          </>
        )}
      </div>
    </div>
  );
};
export default PPSDetailsReview;
