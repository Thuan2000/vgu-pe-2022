import Cookie from "js-cookie";
import SSRCookie from "cookie";
import {
  AUTH_CRED,
  CHAT_AUTH_COOKIE_NAME,
  CHAT_KEEP_LOGIN_COOKIE_NAME,
  LOGGED_IN_USER,
  REDIRECT_AFTER_LOGIN,
} from "./constants";
import { IMeInfoResponse, IUser } from "@graphql/types.graphql";
import { encodeString, generateUUID } from "./functions";
import { m } from "framer-motion";

const cookieDomain = { domain: `.${process.env.NEXT_PUBLIC_DOMAIN}` };

const isDevelopment = process.env.NODE_ENV === "development";

function getDomain() {
  return !isDevelopment ? { ...cookieDomain } : {};
}

export function setAuthCredentials(token: string) {
  const authCred = { token };
  Cookie.set(AUTH_CRED, JSON.stringify({ ...authCred }), getDomain());
}

export function removeAuthCredentials() {
  Cookie.remove(AUTH_CRED, getDomain());
}

export function getAuthCredentials(context?: any): {
  token: string | null;
  role: string | null;
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

  return { token: null, role: null };
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

export function isAuthenticated(_cookies: { token: string }) {
  return _cookies.token;
}

export function removeRedirectLinkAfterLogin() {
  Cookie.remove(REDIRECT_AFTER_LOGIN, getDomain());
}

export function setRedirectLinkAfterLogin(url: string) {
  Cookie.set(REDIRECT_AFTER_LOGIN, url, getDomain());
}

export function getRedirectLinkAfterLogin() {
  const redirectLink = Cookie.get(REDIRECT_AFTER_LOGIN);
  return redirectLink;
}

export function setMeData({ user }: { user: IUser }) {
  Cookie.set(LOGGED_IN_USER, JSON.stringify(user), getDomain());
}

export function isLogin() {
  const authCred = getAuthCredentials();
  return !!authCred.token;
}

export function getMeData(): IMeInfoResponse | { company: null; user: null } {
  const rawUser = Cookie.get(LOGGED_IN_USER);
  if (!rawUser) return { company: null, user: null };
  const { company, ...user } = JSON.parse(rawUser);

  return { user, company };
}

export function removeMeData() {
  Cookie.remove(LOGGED_IN_USER, getDomain());
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

export function getChatLogin(username: string, password: string) {
  return {
    login: {
      id: generateUUID(),
      scheme: "basic",
      secret: encodeString(`${username}:${password}`),
    },
  };
}

export function getHiMessage() {
  return {
    hi: {
      id: generateUUID(),
      ver: "0.17.10",
    },
  };
}
