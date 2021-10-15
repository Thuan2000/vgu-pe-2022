import React from "react";
import Image from "next/image";

interface IProductImageProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProductImage: React.FC<IProductImageProps> = ({
  className,
  ...props
}) => {
  return <div></div>;
};
export default ProductImage;
