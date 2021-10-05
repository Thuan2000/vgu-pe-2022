import React from "react";

interface InlineLabelProps {
  text: string;
  labelWidth: string;
}

const InlineLabel: React.FC<InlineLabelProps> = ({ text, labelWidth }) => {
  return (
    <div className="flex-items-center">
      <p className="font-semibold" style={{ width: labelWidth }}>
        {text}
      </p>
      <p className="ml-2 mr-5">:</p>
    </div>
  );
};

export default InlineLabel;
