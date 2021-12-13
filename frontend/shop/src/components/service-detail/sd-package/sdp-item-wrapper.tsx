import React from "react";

interface ISDPTableItemWrapperProps {
  className?: string;
  isLast?: boolean;
  isHead?: boolean;
}

const SDPTableItemWrapper: React.FC<ISDPTableItemWrapperProps> = ({
  className,
  isLast,
  isHead,
  children,
}) => {
  return (
    <div
      className={`${className} w-full !flex-shrink-0 flex-center h-10
                ${!isLast && "border-r"}
                ${isHead && "bg-gray-100"}
            `}
    >
      {children}
    </div>
  );
};
export default SDPTableItemWrapper;
