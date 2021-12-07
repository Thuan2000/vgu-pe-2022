import React from "react";
import Navbar from "@components/ui/navbar/navbar";
import useIsPhone from "src/hooks/isPhone.hook";

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
