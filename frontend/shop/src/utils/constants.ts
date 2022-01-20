import { PageNameLabel } from "./interfaces";

export const PAGE_NAME_INTO_LABEL = {
  ["" as any]: "HOMEPAGE_PAGE_SEARCH_LABEL",
  ["nha-cung-cap"]: "COMPANY_PAGE_SEARCH_LABEL",
  ["nhu-cau-thu-mua"]: "TENDER_PAGE_SEARCH_LABEL",
  ["san-pham"]: "PRODUCT_PAGE_SEARCH_LABEL",
  ["dich-vu"]: "SERVICE_PAGE_SEARCH_LABEL",
  ["ho-tro"]: "SUPPORT_PAGE_SEARCH_LABEL",
};

// Fetch Limit
export const BUYING_REQUESTS_GET_LIMIT = 8;

export enum ERole {
  SUPER_ADMIN = "SUPER_ADMIN",
  COMPANY_OWNER = "COMPANY_OWNER",
  COMPANY_STAFF = "COMPANY_STAFF",
  GUESS = "GUESS",
}

// AUTH
export const roles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  COMPANY_OWNER: "COMPANY_OWNER",
  COMPANY_STAFF: "COMPANY_STAFF",
  GUESS: "GUESS",
};

export const AUTH_ERRORS = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
};

// Size
export const FILE_SIZE_LIMIT = 20000000;
export const LIMIT = 10;
export const MILLION_COUNT = 7;
export const BILLION_COUNT = 10;
export const MILLION = 1000000;
export const BILLION = 1000000000;
export const MONTH_IN_MS = 2629800000;

// cookie
export const ROLE = "ROLE";
export const TOKEN = "token";
export const PERMISSIONS = "permissions";
export const AUTH_CRED = "AUTH_CRED";
export const REDIRECT_AFTER_LOGIN = "REDIRECT_AFTER_LOGIN";
export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const CHAT_AUTH_COOKIE_NAME = "auth-token";
export const CHAT_KEEP_LOGIN_COOKIE_NAME = "keep-logged-in";

// Settings
export const MOBILE_SIZE = { min: 300, max: 480 };

// Chat
const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_SERVER_URL;
const CHAT_API_KEY = process.env.NEXT_PUBLIC_CHAT_SERVER_API_KEY;
export const CHAT_URL = `${CHAT_ENDPOINT}?apikey=${CHAT_API_KEY}`;
