import React from "react";

interface IPath {
  label: string;
  href: string;
}

interface IBreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  homeHref: string;
  paths: IPath[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div>BREADRUMB</div>
    </div>
  );
};
export default Breadcrumb;
