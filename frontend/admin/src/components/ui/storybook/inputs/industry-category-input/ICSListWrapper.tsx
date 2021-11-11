import React from "react";

interface IICSListWrapperProps {}

const ICIListWrapper: React.FC<IICSListWrapperProps> = ({ children }) => {
  return (
    <ul className="p-2 w-1/2 h-80 overflow-auto scrollbar-thin">{children}</ul>
  );
};
export default ICIListWrapper;
