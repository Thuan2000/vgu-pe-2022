import React from "react";
interface INavigationProps extends React.SVGAttributes<{}> {
  isActive?: boolean;
}
const DownVIcon: React.FC<INavigationProps> = ({
  isActive,
  fill,
  ...props
}) => {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"
        fill={fill || (isActive ? "#000" : "#82868C")}
      />
    </svg>
  );
};
export default DownVIcon;
