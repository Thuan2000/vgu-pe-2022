export const BUYING_REQUESTS_GET_LIMIT = 8;

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

export const FILE_SIZE_LIMIT = 20000000;
export const LIMIT = 10;

export const MILLION_COUNT = 7;
export const BILLION_COUNT = 10;

export const MILLION = 1000000;
export const BILLION = 1000000000;

// cookie
export const ROLE = "ROLE";
export const TOKEN = "token";
export const PERMISSIONS = "permissions";
export const AUTH_CRED = "AUTH_CRED";
export const REDIRECT_AFTER_LOGIN = "REDIRECT_AFTER_LOGIN";
export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const LOGGED_IN_COMPANY = "LOGGED_IN_COMPANY";
export const IS_FULL_INFO_COMP = "IS_FULL_INFO_COMP";

// Settings
export const MOBILE_SIZE = { min: 300, max: 480 };

// Chat
export const CHAT_AUTH_COOKIE_NAME = "auth-token";
export const CHAT_KEEP_LOGIN_COOKIE_NAME = "keep-logged-in";
const CHAT_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_SERVER_URL;
const CHAT_API_KEY = process.env.NEXT_PUBLIC_CHAT_SERVER_API_KEY;
export const CHAT_URL = `${CHAT_ENDPOINT}?apikey=${CHAT_API_KEY}`;

/**
 * Get database attribute name by locale
 */
export const getNameByLocale: any = {
  "": "nameVn",
  en: "nameEn",
  vi: "nameVn",
};
