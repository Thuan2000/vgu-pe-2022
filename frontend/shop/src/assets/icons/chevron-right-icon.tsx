import React from "react";
const ChevronRightIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg width="6" height="11" viewBox="0 0 6 11" fill="none" {...props}>
      <path
        d="M0.195262 9.97124C-0.0650874 9.71089 -0.0650874 9.28878 0.195262 9.02843L3.72386 5.49984L0.195262 1.97124C-0.0650878 1.71089 -0.0650878 1.28878 0.195262 1.02843C0.455611 0.768083 0.877721 0.768083 1.13807 1.02843L5.13807 5.02843C5.39842 5.28878 5.39842 5.71089 5.13807 5.97124L1.13807 9.97124C0.877722 10.2316 0.455612 10.2316 0.195262 9.97124Z"
        fill={fill || "#82868C"}
      />
    </svg>
  );
};
export default ChevronRightIcon;
