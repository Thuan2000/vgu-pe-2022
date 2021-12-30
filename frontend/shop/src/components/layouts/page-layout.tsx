import React from "react";
import Navbar from "@components/ui/navbar/navbar";
import useIsPhone from "src/hooks/isPhone.hook";
import Footer from "./footer";

const PageLayout: React.FC = ({ children }) => {
  const isPhone = useIsPhone();

  return (
    <>
      {!isPhone && <Navbar className="fixed top-0 w-full" />}
      {!isPhone && <div className={`mt-40 px-10 md:px-48`}>{children}</div>}
      {isPhone && <div>{children}</div>}
      {!isPhone && <Footer />}
    </>
  );
};
export default PageLayout;
