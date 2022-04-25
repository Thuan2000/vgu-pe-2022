import ImagesSection from "@components/post-tender-form/check-section/images-section";
import ReviewQA from "@components/ui/review-qa";
import ReviewSectionTitle from "@components/ui/review-section-title";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React from "react";
import { useFormContext } from "react-hook-form";
import { PPS_CATEGORY_FORM_INDEX } from "../../pps-service/pps-service-constants";
import PPSAttachmentVideosReview from "../../pps-service/pps-service-reviews/pps-service-attachment-videos-review";
import {
  IPostProductFormValues,
  IPPSFDetailsSection,
} from "../pps-product-interface";
import PPSCertificateReview from "./pps-product-certicate-review";

interface IPPSGeneralReviewProps {
  changeSection: (id: number) => void;
}

const PPSGeneralReview: React.FC<IPPSGeneralReviewProps> = ({
  changeSection,
}) => {
  const { t } = useTranslation("form");
  const { getValues } = useFormContext<IPostProductFormValues>();
  const {
    category,
    industry,
    minOrder,
    images,
    certificates,
    description,
    videos,
  } = getValues("general") || {};

  function getIndustryCategoryValue() {
    return `${t("industry:" + industry?.label)} > ${t(
      "category:" + category?.label
    )}`;
  }

  return (
    <div className={`fic items-start`}>
      <div className="sm:w-2/3 flex-shrink-0 mr-10">
        <ReviewSectionTitle
          onClick={() => changeSection(PPS_CATEGORY_FORM_INDEX)}
          title={t("details-nav-label")}
        />
        <div className="space-y-2 mt-2">
          <ReviewQA
            label={t("pps-review-product-name")}
            value={category?.label}
          />
          <ReviewQA
            label={t("pps-review-product-industryCategory")}
            value={getIndustryCategoryValue()}
          />
          <ReviewQA
            label={t("pps-product-description-review-label")}
            isDescription
            value={description}
          />
          <ReviewQA
            label={t("pps-product-minOrder-review-label")}
            value={minOrder + ""}
          />
          {!!videos?.length && (
            <>
              <Typography
                className="text-semibold"
                text={t("pps-review-video-title")}
              />
              <PPSAttachmentVideosReview videos={videos} />
            </>
          )}
          {!!certificates?.length && (
            <div>
              <Typography
                className="text-semibold"
                text={t("pps-review-certificates-title")}
              />
              <PPSCertificateReview certificates={certificates} />
            </div>
          )}
        </div>
      </div>

      {!!images?.length && (
        <div className="sm:w-1/3 flex justify-end">
          <ImagesSection
            getImageSrc={(img) => img.url}
            className="w-[280px]"
            images={images}
            changeSection={(_) => changeSection(PPS_CATEGORY_FORM_INDEX)}
            imageWrapperClass="h-[190px] w-[280px]"
            isImageFill
          />
        </div>
      )}
    </div>
  );
};
export default PPSGeneralReview;
