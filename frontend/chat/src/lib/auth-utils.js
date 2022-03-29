import Cookies from "js-cookie";
import { getDomain, AUTH_CRED } from "../lib/cookie-util";

export function checkIsLogin() {
  const isLogin = Cookies.get(AUTH_CRED, getDomain());

  return !!isLogin;
}
