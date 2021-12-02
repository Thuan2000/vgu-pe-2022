import React from "react";
import Navbar from "@components/ui/navbar/navbar";
import Breadcrumb from "@components/ui/storybook/breadcrumb";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/dist/client/router";
import { setCharAt } from "@utils/functions";
import UnderDevelopment from "@components/under-development";
import useIsPhone from "src/hooks/isPhone.hook";

const dummy = [
  { label: "Route 1", href: "#" },
  { label: "Route 2", href: "#" },
  { label: "Route 3", href: "#" },
];

const PageLayout: React.FC = ({ children }) => {
  const isPhone = useIsPhone();

  return (
    <div className="px-10 md:px-48">
      {!isPhone && <Navbar />}

      {children}
    </div>
  );
};
export default PageLayout;
