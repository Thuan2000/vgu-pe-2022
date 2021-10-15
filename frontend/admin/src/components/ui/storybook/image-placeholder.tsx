import React from "react";

interface IImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {}

const ImagePlaceholder: React.FC<IImagePlaceholderProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className="relative w-full h-full border border-gray-40">Mantul</div>
    </div>
  );
};
export default ImagePlaceholder;
