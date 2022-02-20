import { isLogin as checkIsLogin } from "@utils/auth-utils";
import React, { useEffect } from "react";
import HaveToLoginIllustration from "./ui/buying-requests/have-to-login-illustration";

interface INeedToLoginWrapperProps {}

const NeedToLoginWrapper: React.FC<INeedToLoginWrapperProps> = ({
  children,
}) => {
  const isLogin = checkIsLogin();

  useEffect(() => {
    if (!isLogin) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isLogin]);

  if (isLogin) return <>{children}</>;

  return (
    <div className={`relative`}>
      {!isLogin && <HaveToLoginIllustration />}

      <div className={`${!isLogin && "select-none blur-sm"}`}>{children}</div>
    </div>
  );
};
export default NeedToLoginWrapper;
