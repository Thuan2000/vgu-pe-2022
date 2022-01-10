interface IVariationItemWrapperProps {
  children: any;
  isLeftSide?: boolean;
  isRightSide?: boolean;
  isHeader?: boolean;
  isFooter?: boolean;
}

function VariationPriceInputItemWrapper({
  children,
  isLeftSide,
  isRightSide,
  isHeader,
  isFooter,
}: IVariationItemWrapperProps) {
  return (
    <div
      className={`border border-b-0 border-r-0 h-14 flex-center w-1/2
      ${isHeader && "bg-gray-10"}
      ${isHeader && isLeftSide && "rounded-tl-sm"}
      ${isHeader && isRightSide && "rounded-tr-sm"}
      ${isRightSide && "border-r-1"}
      ${isFooter && "!border-b-1"}
      ${isFooter && isLeftSide && "!rounded-bl-sm"}
      ${isFooter && isRightSide && "!rounded-br-sm"}
      `}
    >
      {children}
    </div>
  );
}

export default VariationPriceInputItemWrapper;
