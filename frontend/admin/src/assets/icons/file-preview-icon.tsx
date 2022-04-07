import { COLORS } from "@utils/colors";
import React from "react";
const FilePreviewIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg viewBox="0 0 24 24" width="48px" height="48px" {...props}>
      <path
        d="M19,20c0,0.6-0.4,1-1,1H6c-0.6,0-1-0.4-1-1V4c0-0.6,0.4-1,1-1h7.6L19,8.4V20z"
        opacity=".3"
        fill={fill || COLORS.DARK_BLUE}
      />
      <path
        fill={fill || COLORS.DARK_BLUE}
        d="M18,22H6c-1.1,0-2-0.9-2-2V4c0-1.1,0.9-2,2-2h8l6,6v12C20,21.1,19.1,22,18,22z M6,4v16h12V8.8L13.2,4H6z"
      />
      <path fill={fill || COLORS.DARK_BLUE} d="M18.5 9L13 9 13 3.5z" />
    </svg>
  );
};
export default FilePreviewIcon;
