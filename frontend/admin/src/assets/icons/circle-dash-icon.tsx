import React from "react";
const CircleDashIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg
      width="89"
      height="89"
      viewBox="0 0 89 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="44.5"
        cy="44.5"
        r="42.5"
        stroke={fill || "#A3ADB4"}
        strokeWidth="4"
      />
      <path
        d="M30 45H59"
        stroke={fill || "#A3ADB4"}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default CircleDashIcon;
