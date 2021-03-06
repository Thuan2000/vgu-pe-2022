import React from "react";
const PencilIcon: React.FC<React.SVGAttributes<{}>> = ({ fill, ...props }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.7197 0.71967C11.0126 0.426777 11.4874 0.426777 11.7803 0.71967L14.7803 3.71967C15.0732 4.01256 15.0732 4.48744 14.7803 4.78033L5.03033 14.5303C4.88968 14.671 4.69891 14.75 4.5 14.75H1.5C1.08579 14.75 0.75 14.4142 0.75 14V11C0.75 10.8011 0.829018 10.6103 0.96967 10.4697L8.46951 2.96983L10.7197 0.71967ZM9 4.56066L2.25 11.3107V13.25H4.18934L10.9393 6.5L9 4.56066ZM12 5.43934L13.1893 4.25L11.25 2.31066L10.0607 3.5L12 5.43934Z"
        fill={fill || "white"}
      />
    </svg>
  );
};
export default PencilIcon;
