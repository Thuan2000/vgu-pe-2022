import React from "react";

interface INumberLabel extends React.HTMLAttributes<HTMLDivElement> {
  number: number | string;
  backgroundColor?: string;
}

const NumberLabel: React.FC<INumberLabel> = ({
  className,
  number,
  // @TODO :: This should be "primary"
  backgroundColor = "green",
  ...rest
}) => {
  return (
    <div
      className={`p-2 rounded-full bg-${backgroundColor} w-6 h-6 flex-center text-white ${className}`}
      {...rest}
    >
      {number}
    </div>
  );
};
export default NumberLabel;
