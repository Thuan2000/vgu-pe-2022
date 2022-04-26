import React from "react";
import PPSProductFooterButton, {
  IPPSProductFooterButtonProps,
} from "../post-product-service/pps-product/pps-product-footer-button";

interface IPostNavNextBackButtonProps extends IPPSProductFooterButtonProps {
  isStatBottom?: boolean;
}

const PostNavNextBackButton: React.FC<IPostNavNextBackButtonProps> = ({
  formPosition,
  onNextClick,
  onBackClick,
  endPosition,
  loading,
  isStatBottom = false,
}) => {
  return (
    <div
      className={
        isStatBottom
          ? "sticky bottom-0 right-0 left-0 bg-white p-4 px-5 border rounded-md border-gray-100 border-b-0 !-mt-2"
          : ""
      }
    >
      <PPSProductFooterButton
        endPosition={endPosition}
        formPosition={formPosition}
        onNextClick={onNextClick}
        loading={loading}
        onBackClick={onBackClick}
      />
    </div>
  );
};
export default PostNavNextBackButton;
