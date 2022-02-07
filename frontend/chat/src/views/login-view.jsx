import React from "react";
import { FormattedMessage } from "react-intl";

const LoginView = () => {
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
