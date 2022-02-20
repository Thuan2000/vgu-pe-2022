import { isLogin as checkIsLogin } from "@utils/auth-utils";
import { getIsCompanyFullInfo } from "@utils/functions";
import React, { useEffect } from "react";
import HaveToFullInfoIllustration from "./have-to-full-info-illustration";

interface IHaveToFullInfoWrapperProps {}

const HaveToFullInfoWrapper: React.FC<IHaveToFullInfoWrapperProps> = ({
  children,
}) => {
  const isFullInfo = getIsCompanyFullInfo();

  useEffect(() => {
    if (!isFullInfo) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isFullInfo]);

  if (isFullInfo) return <>{children}</>;

  return (
    <div className={`relative`}>
      {!isFullInfo && <HaveToFullInfoIllustration />}

      <div className={`${!isFullInfo && "select-none blur-sm"}`}>
        {children}
      </div>
    </div>
  );
};
export default HaveToFullInfoWrapper;
