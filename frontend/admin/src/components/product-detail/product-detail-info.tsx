import PPSCertificateReview from "@components/ui/post-product-service/pps-product/pps-product-reviews/pps-product-certicate-review";
import PPSAttachmentVideosReview from "@components/ui/post-product-service/pps-service/pps-service-reviews/pps-service-attachment-videos-review";
import { IFile } from "@graphql/types.graphql";
import React from "react";

interface IProductDetailInfoProps {
  videos?: IFile[];
  certificates: IFile[];
}

const ProductDetailInfo: React.FC<IProductDetailInfoProps> = ({
  videos,
  certificates,
}) => {
  return (
    <div>
      {!!videos?.length && <PPSAttachmentVideosReview videos={videos} />}
      {!!videos?.length && <PPSCertificateReview certificates={certificates} />}
    </div>
  );
};
export default ProductDetailInfo;
