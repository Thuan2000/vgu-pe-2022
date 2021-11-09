import React from "react";
const VietnamFlagIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="16" height="12" fill="#E31D1C" />
      <path
        d="M8 2L8.89806 4.76393H11.8042L9.45308 6.47214L10.3511 9.23607L8 7.52786L5.64886 9.23607L6.54692 6.47214L4.19577 4.76393H7.10194L8 2Z"
        fill="#FFD018"
      />
    </svg>
  );
};
export default VietnamFlagIcon;
