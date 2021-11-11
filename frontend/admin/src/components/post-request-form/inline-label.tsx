import React from "react";

interface InlineLabelProps {
  text: string;
  labelWidth?: string;
  textClass?: string;
  className?: string;
}

const InlineLabel: React.FC<InlineLabelProps> = ({
  text,
  labelWidth,
  textClass,
  className,
}) => {
  return (
    <div className={`flex-items-center ${className}`}>
      <p className={`text-sm ${textClass}`} style={{ width: labelWidth }}>
        {text}
      </p>
      <p className="ml-6 mr-5">:</p>
    </div>
  );
};

export default InlineLabel;
