import React from "react";
const FolderDownloadIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.5 4.5C1.5 3.67157 2.17157 3 3 3H6.75C6.94891 3 7.13968 3.07902 7.28033 3.21967L8.56066 4.5H15C15.8284 4.5 16.5 5.17157 16.5 6V13.5C16.5 14.3284 15.8284 15 15 15H3C2.17157 15 1.5 14.3284 1.5 13.5V4.5ZM6.43934 4.5L3 4.5V13.5H15V6H8.25C8.05109 6 7.86032 5.92098 7.71967 5.78033L6.43934 4.5Z"
        fill={fill || "white"}
      />
      <path
        d="M6.75 9.75H11.25M11.25 9.75L9.80357 11.25M11.25 9.75L9.80357 8.25"
        stroke={fill || "white"}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default FolderDownloadIcon;
