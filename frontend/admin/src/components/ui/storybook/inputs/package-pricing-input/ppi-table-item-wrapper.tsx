import React from "react";

interface IPPITableItemWrapperProps {
  className?: string;
  isLast?: boolean;
  isHead?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PPITableItemWrapper: React.FC<IPPITableItemWrapperProps> = ({
  className,
  isLast,
  isHead,
  onClick,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} w-full !flex-shrink-0 flex-center h-10
                    ${!isLast && "border-r"}
                    ${isHead && "bg-gray-100"}
                `}
    >
      {children}
    </div>
  );
};

export default PPITableItemWrapper;
