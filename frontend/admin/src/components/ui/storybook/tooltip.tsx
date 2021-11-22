import { motion, FeatureProps } from "framer-motion";
import React from "react";

interface ITooltipProps {
  text: string;
  color?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({ text }) => {
  return (
    <p
      className={`absolute left-[10%] bottom-full bg-dark-blue mb-2 rounded-sm text-white font-semibold text-sm py-1 px-3 flex flex-center z-50 triangle-pointer tooltip animate-fadeIn`}
    >
      {text}
    </p>
  );
};
export default Tooltip;
