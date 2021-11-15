import React from "react";

interface ITableIndividualWrapperProps {
  className?: string;
  isLast?: boolean;
  isHead?: boolean;
}

const TableIndividualWrapper: React.FC<ITableIndividualWrapperProps> = ({
  className,
  isLast,
  isHead,
  children,
}) => {
  return (
    <div
      className={`flex-shrink-0 flex-center border-b h-10
                    ${!isLast && "border-r"}
                    ${isHead && "bg-gray-100"}
                    ${className}
                `}
    >
      {children}
    </div>
  );
};

export default TableIndividualWrapper;
