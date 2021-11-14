import React from "react";

const LTEIcon: React.FC<React.SVGAttributes<{}>> = ({ fill, ...props }) => {
  return (
    <svg
      width="9"
      height="11"
      viewBox="0 0 9 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.75 7.49219L6.47656 5.125L0.75 2.4375V0.921875L8.38281 4.72656V5.67188L0.75 9.03125V7.49219ZM0.75 11V9.60938H8.38281V11H0.75Z"
        fill="#15114E"
      />
    </svg>
  );
};
export default LTEIcon;
