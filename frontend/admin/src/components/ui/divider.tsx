import React from "react";
const Divider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={`w-full h-1 border-b-2 border-gray-10 ${className}`}></div>
  );
};
export default Divider;
