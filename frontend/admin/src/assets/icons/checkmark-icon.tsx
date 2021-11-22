import React from "react";
const CheckmarkIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.9152 0.782876C12.1732 1.0122 12.1965 1.40724 11.9671 1.66523L5.30047 9.16523C5.18187 9.29866 5.01186 9.37501 4.83334 9.37501C4.65482 9.37501 4.48481 9.29866 4.36621 9.16523L1.03288 5.41523C0.803552 5.15724 0.82679 4.7622 1.08478 4.53288C1.34277 4.30355 1.73781 4.32679 1.96714 4.58478L4.83334 7.80926L11.0329 0.834779C11.2622 0.57679 11.6572 0.553552 11.9152 0.782876Z"
        fill={fill || "#82868C"}
      />
    </svg>
  );
};
export default CheckmarkIcon;
