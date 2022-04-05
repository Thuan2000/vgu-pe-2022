import React from "react";
const SendMessageIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => {
  return (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" {...props}>
      <path
        d="M1.58311 12.0352L2.99538 6.99764L1.58311 1.96007C1.40839 1.34445 2.01989 0.796401 2.58771 1.07418L13.5802 6.32196C14.1407 6.59223 14.1407 7.41807 13.5802 7.68083L2.58771 12.9286C2.01989 13.1989 1.40839 12.6583 1.58311 12.0352Z"
        fill={fill || "#B0BDC6"}
        stroke={fill || "#B0BDC6"}
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.33203 7H6.99997"
        stroke="white"
        strokeWidth="1.2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default SendMessageIcon;
