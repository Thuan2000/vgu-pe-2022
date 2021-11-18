import React from "react";
const CopyIcon: React.FC<React.SVGAttributes<{}>> = ({ fill, ...props }) => {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.25 2C0.25 1.30964 0.809644 0.75 1.5 0.75H7.75C8.44036 0.75 9 1.30964 9 2V4.5H11.5C12.1904 4.5 12.75 5.05964 12.75 5.75V12C12.75 12.6904 12.1904 13.25 11.5 13.25H5.25C4.55964 13.25 4 12.6904 4 12V9.5H1.5C0.809644 9.5 0.25 8.94036 0.25 8.25V2ZM5.25 9.5V12H11.5V5.75H9V8.25C9 8.94036 8.44036 9.5 7.75 9.5H5.25ZM7.75 8.25V2L1.5 2V8.25H7.75Z"
        fill={fill || "#82868C"}
      />
    </svg>
  );
};
export default CopyIcon;
