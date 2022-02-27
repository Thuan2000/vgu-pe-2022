import React from "react";
import Navbar from "@components/ui/navbar/navbar";
import useIsPhone from "src/hooks/isPhone.hook";
import Footer from "./footer";
import useIsFullInfoCompChecker from "src/hooks/useIsFullInfoCompChecker";

const PageLayout: React.FC = ({ children }) => {
  const isFullInfoComp = useIsFullInfoCompChecker();
  const isPhone = useIsPhone();

  const marginTop = isFullInfoComp ? 'mt-36' : 'mt-56';

  return (
    <>
      {!isPhone && <Navbar className="fixed top-0 w-full" />}
      {!isPhone && (
        <div className={`px-10 mb-8 ${marginTop} md:px-48 relative`}>{children}</div>
      )}
      {isPhone && <div>{children}</div>}
      {!isPhone && <Footer />}
    </>
  );
};
export default PageLayout;
