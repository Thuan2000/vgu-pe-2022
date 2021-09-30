import React from "react";

interface INumberLabel extends React.HTMLAttributes<HTMLDivElement> {
  number: number | string;
}

const NumberLabel: React.FC<INumberLabel> = ({
  className,
  number,
  ...rest
}) => {
  return (
    <div
      className={`p-2 rounded-full bg-green w-6 h-6 flex-center text-white ${className}`}
      {...rest}
    >
      {number}
    </div>
  );
};
export default NumberLabel;
