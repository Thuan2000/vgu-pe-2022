import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { ERole } from "@utils/constants";
import { getLoggedInUser } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { GetServerSideProps } from "next";
import React from "react";

interface IRouteMiddlewareProps {
  minRole: ERole;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = getAuthCredentials(ctx);

  if (!token || !isAuthenticated({ token })) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }

  return { props: {} };
};

const RouteMiddleware: React.FC<IRouteMiddlewareProps> = ({ children }) => {
  return <>{children}</>;
};
export default RouteMiddleware;
