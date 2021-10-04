import Sidebar from "@components/ui/sidebar";
import React from "react";
const PageLayout: React.FC = (props) => {
  return (
    <div className="flex bg-light-300 min-h-screen min-w-full">
      <Sidebar className="hidden md:block" />
      <main className="md:ml-8">{props.children}</main>
    </div>
  );
};
export default PageLayout;
