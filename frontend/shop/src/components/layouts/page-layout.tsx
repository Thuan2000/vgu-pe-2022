import React from "react";
import Navbar from "@components/ui/navbar/navbar";
import useIsPhone from "src/hooks/isPhone.hook";
import Footer from "./footer";

const PageLayout: React.FC = ({ children }) => {
  const isPhone = useIsPhone();

  return (
    <>
      {!isPhone && <Navbar className="fixed top-0 w-full" />}
      {!isPhone && (
        <div className={`px-10 mb-8 mt-36 md:px-48 relative`}>{children}</div>
      )}
      {isPhone && <div>{children}</div>}
      {!isPhone && <Footer />}
    </>
  );
};
export default PageLayout;
