import React from "react";

interface IICSListWrapperProps {
  className?: string;
}

const ICIListWrapper: React.FC<IICSListWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <ul className={`${className} p-2 w-1/2 h-80 overflow-auto scrollbar-thin`}>
      {children}
    </ul>
  );
};
export default ICIListWrapper;
