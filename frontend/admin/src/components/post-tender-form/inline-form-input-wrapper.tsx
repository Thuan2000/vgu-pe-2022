import React from "react";

interface IInlineFormInputWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const InlineFormInputWrapper: React.FC<IInlineFormInputWrapperProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`flex items-center mb-1 md:mb-0 ${className}`} {...props}>
      {children}
    </div>
  );
};
export default InlineFormInputWrapper;
