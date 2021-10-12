import React from "react";
interface INavigationProps extends React.SVGAttributes<{}> {
  isActive?: boolean;
}
const UnderlineIcon: React.FC<INavigationProps> = ({
  isActive,
  fill,
  ...props
}) => {
  return (
    <svg
      width="600"
      height="10"
      viewBox="0 0 600 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="600"
        height="10"
        rx="3.5"
        fill={fill || (isActive ? "#00D796" : "#EEF2F5")}
      />
    </svg>
  );
};
export default UnderlineIcon;
