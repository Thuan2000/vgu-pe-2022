import React from "react";

interface INavigationProps extends React.SVGAttributes<{}> {
  isActive?: boolean;
}

const LogoutIcon: React.FC<INavigationProps> = ({
  isActive,
  fill,
  ...props
}) => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33333 11.3333C5.33333 10.9651 5.03486 10.6667 4.66667 10.6667H1.33333V1.33333H4.66667C5.03486 1.33333 5.33333 1.03486 5.33333 0.666667C5.33333 0.298476 5.03486 0 4.66667 0H1.33333C0.596954 0 0 0.596954 0 1.33333V10.6667C0 11.403 0.596954 12 1.33333 12H4.66667C5.03486 12 5.33333 11.7015 5.33333 11.3333Z"
        fill={fill || isActive ? "#00D796" : "#82868C"}
      />
      <path
        d="M12.4757 6.46703C12.5375 6.40414 12.5843 6.33203 12.6161 6.25519C12.6484 6.17717 12.6664 6.09166 12.6667 6.002L12.6667 6L12.6667 5.998C12.6662 5.82805 12.6011 5.65826 12.4714 5.52859L9.80474 2.86193C9.54439 2.60158 9.12228 2.60158 8.86193 2.86193C8.60158 3.12228 8.60158 3.54439 8.86193 3.80474L10.3905 5.33333H4C3.63181 5.33333 3.33333 5.63181 3.33333 6C3.33333 6.36819 3.63181 6.66667 4 6.66667H10.3905L8.86193 8.19526C8.60158 8.45561 8.60158 8.87772 8.86193 9.13807C9.12228 9.39842 9.54439 9.39842 9.80474 9.13807L12.4709 6.47188L12.4757 6.46703Z"
        fill={fill || isActive ? "#00D796" : "#82868C"}
      />
    </svg>
  );
};
export default LogoutIcon;