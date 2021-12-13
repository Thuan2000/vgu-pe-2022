import TriangleIcon from "@assets/icons/triangle-icon";
import Typography from "@components/ui/storybook/typography";
import { IFile } from "@graphql/types.graphql";
import { COLORS } from "@utils/colors";
import { trimText } from "@utils/functions";
import React from "react";

interface IPPSAttachmentVideosReviewProps {
  videos: IFile[];
}

const PPSAttachmentVideosReview: React.FC<IPPSAttachmentVideosReviewProps> = ({
  videos,
}) => {
  function openVideo(v: IFile) {
    window.open(v.url);
  }

  return (
    <div className="fic -mt-1 -ml-3 flex-wrap">
      {(videos as IFile[])?.map((v: IFile) => {
        return (
          <div
            key={+"pps-video-item"}
            className="rounded-sm ml-3 mt-2 border relative"
          >
            <div
              className="relative cursor-pointer"
              onClick={() => openVideo(v)}
            >
              <video className="rounded-sm w-56 h-32 border-b" src={v.url} />
              <div className="absolute x-center y-center bg-white p-1 rounded-full border">
                <TriangleIcon
                  fill={COLORS.PRIMARY.DEFAULT}
                  className="w-10 h-10 translate-x-[3px]"
                />
              </div>
            </div>
            <Typography
              className="text-center py-2"
              variant="smallTitle"
              text={trimText(v.fileName, 30)}
            />
          </div>
        );
      })}
    </div>
  );
};
export default PPSAttachmentVideosReview;
