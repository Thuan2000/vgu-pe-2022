import { FontSize } from "@utils/interfaces";
import React from "react";

interface IRequiredSignProps {
  size?: FontSize;
}

const RequiredSign: React.FC<IRequiredSignProps> = ({ size }) => {
  return (
    <span
      style={{ color: "red", fontWeight: "normal" }}
      className={`text-${size}`}
    >
      &nbsp;*
    </span>
  );
};
export default RequiredSign;
