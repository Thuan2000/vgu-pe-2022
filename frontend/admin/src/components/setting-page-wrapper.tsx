import React from "react";
import SettingNavigation, { INav } from "./ui/setting-navigation";

interface ISettingPageWrapperProps {
  navs: INav[];
  noXPadding?: boolean;
}

const SettingPageWrapper: React.FC<ISettingPageWrapperProps> = ({
  children,
  navs,
  noXPadding,
}) => {
  return (
    <div>
      <div className={"px-5"}>
        <SettingNavigation navs={navs} />
      </div>
      <div
        className={`bg-white shadow-md md:rounded-sm border-t-2 translate-y-[-2px] border-primary py-6 mb-5 ${
          !noXPadding ? "px-5" : ""
        } `}
      >
        {children}
      </div>
    </div>
  );
};
export default SettingPageWrapper;
