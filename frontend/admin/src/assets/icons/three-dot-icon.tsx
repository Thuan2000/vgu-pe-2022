import React from "react";
const ThreeDotIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg
      width="4"
      height="13"
      viewBox="0 0 4 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M-3.49691e-07 8C-3.97973e-07 9.10457 0.89543 10 2 10C3.10457 10 4 9.10457 4 8C4 6.89543 3.10457 6 2 6C0.89543 6 -3.01409e-07 6.89543 -3.49691e-07 8Z"
        fill={fill || "#A3ADB4"}
      />
      <path
        d="M-8.74228e-08 2C-1.35705e-07 3.10457 0.89543 4 2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 -3.91405e-08 2 -8.74228e-08C0.895431 -1.35705e-07 -3.91405e-08 0.89543 -8.74228e-08 2Z"
        fill={fill || "#A3ADB4"}
      />
      <path
        d="M-6.11959e-07 14C-6.60242e-07 15.1046 0.89543 16 2 16C3.10457 16 4 15.1046 4 14C4 12.8954 3.10457 12 2 12C0.89543 12 -5.63677e-07 12.8954 -6.11959e-07 14Z"
        fill={fill || "#A3ADB4"}
      />
    </svg>
  );
};
export default ThreeDotIcon;
