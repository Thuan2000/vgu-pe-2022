import BriefcaseIcon from "@assets/icons/briefcase-icon";
import FolderIcon from "@assets/icons/folder-icon";
import MessageIcon from "@assets/icons/message-icon";
import React from "react";

interface IBRCExternalInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  commentsCount: number;
  projectsCount: number;
}

const BRCExternalInfo: React.FC<IBRCExternalInfoProps> = ({
  commentsCount,
  projectsCount,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="flex items-center">
        <div className="flex items-center mr-5">
          <MessageIcon />
          <h5 className="text-gray-200 ml-2 md:text-md">{commentsCount}</h5>
        </div>
        <div className="flex items-center">
          <FolderIcon />
          <h5 className="text-gray-200 ml-2 md:text-md">{projectsCount}</h5>
        </div>
      </div>
    </div>
  );
};
export default BRCExternalInfo;
