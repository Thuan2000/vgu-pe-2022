import React from "react";

interface IPSListWrapperProps {}

const PSListWrapper: React.FC<IPSListWrapperProps> = ({ children }) => {
  return (
    <div className={`grid grid-cols-4 gap-x-3 gap-y-5 w-full`}>{children}</div>
  );
};
export default PSListWrapper;
