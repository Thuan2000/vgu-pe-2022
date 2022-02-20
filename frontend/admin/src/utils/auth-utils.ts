import Cookie from "js-cookie";
import SSRCookie from "cookie";
import {
  AUTH_CRED,
  CHAT_AUTH_COOKIE_NAME,
  CHAT_KEEP_LOGIN_COOKIE_NAME,
  LOGGED_IN_USER,
  REDIRECT_AFTER_LOGIN,
} from "./constants";
import { ICompany, IMeInfoResponse, IUser } from "@graphql/types.graphql";

const cookieDomain = { domain: `.${process.env.NEXT_PUBLIC_DOMAIN}` };

const isDevelopment = process.env.NODE_ENV === "development";

export function setAuthCredentials(token: string, role: string) {
  const authCred = { token, role };
  Cookie.set(
    AUTH_CRED,
    JSON.stringify({ ...authCred }),
    !isDevelopment ? { ...cookieDomain } : {}
  );
}

export function removeAuthCredentials() {
  Cookie.remove(AUTH_CRED, !isDevelopment ? { ...cookieDomain } : {});
}

export function getAuthCredentials(context?: any): {
  token: string | null;
} {
  let authCred;
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    authCred = Cookie.get(AUTH_CRED);
  }

  if (authCred) {
    return JSON.parse(authCred);
  }

  return { token: null };
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? "");
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}

export function isLogin() {
  const authCred = getAuthCredentials();
  return !!authCred.token;
}

export function setRedirectLinkAfterLogin(url: string) {
  Cookie.set(
    REDIRECT_AFTER_LOGIN,
    url,
    !isDevelopment ? { ...cookieDomain } : {}
  );
}

export function isAuthenticated(_cookies: { token: string; role: string }) {
  return _cookies.token;
}

export function setMeData({ user }: { user: IUser; company: ICompany }) {
  Cookie.set(
    LOGGED_IN_USER,
    JSON.stringify(user),
    !isDevelopment ? { ...cookieDomain } : {}
  );
}

export function getMeData(): IMeInfoResponse | { company: null; user: null } {
  const rawUser = Cookie.get(LOGGED_IN_USER);
  if (!rawUser) return { company: null, user: null };
  const { company, ...user } = JSON.parse(rawUser);

  return { user, company };
}

export function removeMeData() {
  Cookie.remove(LOGGED_IN_USER, !isDevelopment ? { ...cookieDomain } : {});
}

export function getMeDataFromCookie(cookie: any): {
  user: IUser;
  company: ICompany;
} {
  if (!cookie?.LOGGED_IN_USER) return {} as any;
  return JSON.parse(cookie?.LOGGED_IN_USER || "");
}

function getDomain() {
  return !isDevelopment ? { ...cookieDomain } : {};
}

export function removeChatAuthToken() {
  Cookie.remove(CHAT_AUTH_COOKIE_NAME, getDomain());
  Cookie.remove(CHAT_KEEP_LOGIN_COOKIE_NAME, getDomain());
}

export function setChatAuthToken(token: string, expires: string) {
  Cookie.set(
    CHAT_AUTH_COOKIE_NAME,
    JSON.stringify({
      token,
      expires,
    }),
    getDomain()
  );

  Cookie.set(CHAT_KEEP_LOGIN_COOKIE_NAME, "true", getDomain());
}
