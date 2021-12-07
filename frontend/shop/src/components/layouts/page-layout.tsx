import React from "react";
import Navbar from "@components/ui/navbar/navbar";
import useIsPhone from "src/hooks/isPhone.hook";
import Footer from "./footer";

const PageLayout: React.FC = ({ children }) => {
  const isPhone = useIsPhone();

  return (
    <>
      {!isPhone && <Navbar />}
      <div className={`px-10 md:px-48`}>{children}</div>
      <Footer />
    </>
  );
};
export default PageLayout;
