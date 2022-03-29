import React from "react";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { SDCONNECT_URL } from "../../.env";
import { checkIsLogin } from "../lib/auth-utils";
import CookieUtil, { AUTH_TOKEN_NAME } from "../lib/cookie-util";

const LoginView = () => {
  useEffect(() => {
    const isLogin = checkIsLogin();
    // alert("Please Login On Shop First");
    if (!isLogin) {
      window.location.replace(`${SDCONNECT_URL}/login`);
      CookieUtil.removeItem(AUTH_TOKEN_NAME);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <p>
        <FormattedMessage
          id="loading-title"
          defaultMessage="Loading..."
          description="Loading title"
        />
      </p>
    </div>
  );
};
export default LoginView;
