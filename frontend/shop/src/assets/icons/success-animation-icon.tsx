import React from "react";
const SuccessAnimationIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 50 50">
      <circle fill={fill || "#25AE88"} opacity="0" cx="25" cy="25" r="25">
        <animate
          id="an_op"
          attributeName="opacity"
          begin="Capa_1.click"
          dur="0.5s"
          from="0"
          to="1"
          fill="freeze"
          restart="whenNotActive"
        />
      </circle>
      <polyline
        strokeWidth="2"
        strokeDasharray="0,37"
        stroke="#FFFFFF"
        points="
              38,15 22,33 12,25 "
      >
        <animate
          id="check"
          attributeName="stroke-dasharray"
          begin="an_op.end-0.5s"
          dur="3s"
          from="0,37"
          to="37,0"
          fill="freeze"
          restart="whenNotActive"
        />
      </polyline>
    </svg>
  );
};
export default SuccessAnimationIcon;
