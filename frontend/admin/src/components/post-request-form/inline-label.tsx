import React from "react";

interface InlineLabelProps {
  text: string;
  labelWidth?: string;
  textClass?: string;
}

const InlineLabel: React.FC<InlineLabelProps> = ({
  text,
  labelWidth,
  textClass,
}) => {
  return (
    <div className="flex-items-center">
      <p className={`text-sm ${textClass}`} style={{ width: labelWidth }}>
        {text}
      </p>
      <p className="ml-2 mr-5">:</p>
    </div>
  );
};

export default InlineLabel;
