import React, { Children } from "react";

interface IPageWithFilterWrapperProps {}

const PageWithFilterWrapper: React.FC<IPageWithFilterWrapperProps> = ({
  children,
}) => {
  return <main className="flex relative space-x-3 mb-10">{children}</main>;
};
export default PageWithFilterWrapper;
