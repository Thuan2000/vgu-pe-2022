import React from "react";
const TriangleIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg
      width="4"
      height="8"
      viewBox="0 0 4 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.25 0.875L4 4L0.25 7.125L0.25 0.875Z"
        fill={fill || "#82868C"}
      />
    </svg>
  );
};
export default TriangleIcon;
