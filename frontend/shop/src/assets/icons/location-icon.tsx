import React from "react";
const LocationIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8ZM15.5 8C15.5 14.08 10.83 17.89 8.83 19.24C8.58 19.42 8.29 19.5 8 19.5C7.71 19.5 7.42 19.42 7.16 19.24C5.16 17.89 0.5 14.09 0.5 8C0.5 3.72 3.72 0.5 8 0.5C12.27 0.5 15.5 3.72 15.5 8ZM12 8C12 5.79 10.21 4 8 4C5.79 4 4 5.79 4 8C4 10.21 5.79 12 8 12C10.21 12 12 10.21 12 8Z"
        fill={fill || "#41416E"}
      />
    </svg>
  );
};
export default LocationIcon;
