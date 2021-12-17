import React from "react";

interface InlineLabelProps {
  text: string;
  labelWidth?: string;
  textClass?: string;
  className?: string;
  narrowColon?: boolean;
}

const InlineLabel: React.FC<InlineLabelProps> = ({
  text,
  labelWidth,
  textClass,
  className,
  narrowColon,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <p className={`text-sm ${textClass}`} style={{ width: labelWidth }}>
        {text}
      </p>
      <p className={`${narrowColon ? "ml-1 mr-2" : "mr-5"}`}>:</p>
    </div>
  );
};

export default InlineLabel;
