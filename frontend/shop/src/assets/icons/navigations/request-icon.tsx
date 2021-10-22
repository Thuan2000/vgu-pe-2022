import React from "react";

interface INavigationProps extends React.SVGAttributes<{}> {
  isActive?: boolean;
}

const RequestIcon: React.FC<INavigationProps> = ({
  isActive,
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
        d="M4 1C4 0.447715 4.44772 0 5 0H11C11.5523 0 12 0.447715 12 1H14C15.1046 1 16 1.89543 16 3V18C16 19.1046 15.1046 20 14 20H2C0.895431 20 0 19.1046 0 18V3C0 1.89543 0.895431 1 2 1H4ZM4 3H2V18H14V3H12V4C12 4.55228 11.5523 5 11 5H5C4.44772 5 4 4.55228 4 4V3ZM10 2H6V3H10V2Z"
        fill={isActive ? "#00D796" : fill || "#82868C"}
      />
    </svg>
  );
};
export default RequestIcon;
