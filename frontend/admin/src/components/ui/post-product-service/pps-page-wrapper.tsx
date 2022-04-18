import React from "react";
import PostNavigation, { INav } from "../post-navigation";

interface IPPSPageWrapperProps {
  navs: INav[];
  noXPadding?: boolean;
}

const PPSPageWrapper: React.FC<IPPSPageWrapperProps> = ({
  children,
  navs,
  noXPadding,
}) => {
  const navsUi = navs.map((nav, idx) => {
    const { label, getIsActive, getIsFilled, onClick } = nav;
    return <h1>{label}</h1>;
  });

  return (
    <>
      <div
        className={`bg-white shadow-md md:rounded-sm border-t-2 translate-y-[-2px] border-primary py-6 mb-5 ${
          !noXPadding ? "px-5" : ""
        } `}
      >
        {children}
      </div>
    </>
  );
};
export default PPSPageWrapper;
