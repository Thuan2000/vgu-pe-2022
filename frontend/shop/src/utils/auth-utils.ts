import Cookie from "js-cookie";
import SSRCookie from "cookie";
import { AUTH_CRED, LOGGED_IN_USER } from "./constants";
import { ICompany, IUser } from "@graphql/types.graphql";

const cookieDomain = { domain: `.${process.env.NEXT_PUBLIC_DOMAIN}` };

const isDevelopment = process.env.NODE_ENV === "development";

export function setAuthCredentials(token: string) {
  const authCred = { token };
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

export function setMeData({
  user,
  company,
}: {
  user: IUser;
  company: ICompany;
}) {
  Cookie.set(
    LOGGED_IN_USER,
    JSON.stringify({ user, company }),
    !isDevelopment ? { ...cookieDomain } : {}
  );
}

export function getMeData(): { company: ICompany | null; user: IUser | null } {
  const data = Cookie.get(LOGGED_IN_USER);
  if (!data) return { company: null, user: null };

  return JSON.parse(data);
}

export function removeMeData() {
  Cookie.remove(LOGGED_IN_USER, !isDevelopment ? { ...cookieDomain } : {});
}
