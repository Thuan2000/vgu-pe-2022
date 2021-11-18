import TriangleIcon from "@assets/icons/triangle-icon";
import Typography from "@components/ui/storybook/typography";
import { COLORS } from "@utils/colors";
import React from "react";
import { IFile } from "@components/ui/storybook/document-uploader";
import { IFile as IServerFile } from "@graphql/types.graphql";

interface IPPSAttachmentVideosReviewProps {
  videos: IFile[] | IServerFile[];
}

const PPSAttachmentVideosReview: React.FC<IPPSAttachmentVideosReviewProps> = ({
  videos,
}) => {
  function openVideo(v: IFile) {
    window.open(v.localUrl);
  }

  return (
    <div className="fic -mt-1 -ml-3 flex-wrap">
      {(videos as IFile[])?.map((v: IFile) => {
        return (
          <div
            key={v?.name + v?.localUrl + (v as any)?.path + "pps-video-item"}
            className="rounded-sm ml-3 mt-2 border relative"
          >
            <div
              className="relative cursor-pointer"
              onClick={() => openVideo(v)}
            >
              <video
                className="rounded-sm w-56 h-32 border-b"
                src={v.localUrl}
              />
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
              text={v.name}
            />
          </div>
        );
      })}
    </div>
  );
};
export default PPSAttachmentVideosReview;
