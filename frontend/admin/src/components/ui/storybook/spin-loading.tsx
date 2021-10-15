import React from "react";

const SpinLoading = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => {
  return (
    <div
      className={`ml-2 h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin ${className}`}
      style={{
        borderTopColor: color || "#000",
      }}
    ></div>
  );
};
export default SpinLoading;
