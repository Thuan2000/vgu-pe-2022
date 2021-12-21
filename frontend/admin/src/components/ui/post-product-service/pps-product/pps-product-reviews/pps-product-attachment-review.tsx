import { useTranslation } from "next-i18next";
import React from "react";
import { IPPSFAttachmentSection } from "../pps-product-interface";
import ReviewSectionTitle from "../../../review-section-title";
import ImagesSection from "@components/post-tender-form/check-section/images-section";
import Typography from "@components/ui/storybook/typography";
import PPSAttachmentVideosReview from "./pps-product-attachment-videos-review";
import PPSCertificateReview from "./pps-product-certicate-review";

interface IPPSGeneralReviewProps {
  attachment: IPPSFAttachmentSection;
  changeSection: (id: number) => void;
}

const PPSAttachmentReview: React.FC<IPPSGeneralReviewProps> = ({
  attachment,
  changeSection,
}) => {
  const { t } = useTranslation("form");
  const videos = attachment?.videos;
  const certificates = attachment?.certificates;
  const images = attachment?.images;

  function isHaveAttachment() {
    if (!!videos?.length || !!certificates?.length) return true;

    return false;
  }

  return (
    <div className="flex justify-between">
      <div className="sm:w-2/3 flex-shrink-0 mr-10 space-y-2">
        <ReviewSectionTitle
          onClick={() => changeSection(3)}
          title={t("attachment-nav-label")}
        />
        {!isHaveAttachment() && (
          <Typography text={t("no-attachment-provided-message")} />
        )}
        {!!videos?.length && (
          <div>
            <Typography
              className="text-semibold"
              text={t("pps-review-video-title")}
            />
            <PPSAttachmentVideosReview videos={videos} />
          </div>
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
      {!!images?.length && (
        <div className="sm:w-1/3 flex justify-end">
          <ImagesSection
            getImageSrc={(img) => img.url}
            className="w-[280px]"
            images={images}
            changeSection={(_) => changeSection(3)}
            imageWrapperClass="h-[190px] w-[280px]"
            isImageFill
          />
        </div>
      )}
      <div className="space-y-2 mt-2"></div>
    </div>
  );
};
export default PPSAttachmentReview;
