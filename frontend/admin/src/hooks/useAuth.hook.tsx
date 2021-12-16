import { checkIsLogin, setRedirectLinkAfterLogin } from "@utils/auth-utils";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(checkIsLogin());

  const { query, pathname } = useRouter();

  return { isLogin };
};
