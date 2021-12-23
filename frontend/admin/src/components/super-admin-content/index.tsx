import React from "react";
import UnapprovedList from "./unapproved-list";

interface ISuperAdminContentProps {}

const SuperAdminContent: React.FC<ISuperAdminContentProps> = ({}) => {
  return (
    <div>
      <UnapprovedList />
    </div>
  );
};
export default SuperAdminContent;
