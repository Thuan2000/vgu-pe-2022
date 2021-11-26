import React from "react";
import Navbar from "@components/ui/navbar/navbar";
import Breadcrumb from "@components/ui/storybook/breadcrumb";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import { setCharAt } from "@utils/functions";

const dummy = [
  { label: "Route 1", href: "#" },
  { label: "Route 2", href: "#" },
  { label: "Route 3", href: "#" },
];

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className="px-10 md:px-48">
      <Navbar />

      {children}
    </div>
  );
};
export default PageLayout;
