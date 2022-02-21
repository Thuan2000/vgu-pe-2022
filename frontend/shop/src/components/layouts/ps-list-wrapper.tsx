import React from "react";

interface IPSListWrapperProps {}

const PSListWrapper: React.FC<IPSListWrapperProps> = ({ children }) => {
  return <div className={`w-full`}>{children}</div>;
};
export default PSListWrapper;
