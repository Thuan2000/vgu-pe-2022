export const ROUTES = {
  TO_LOGIN: (locale: string) => `${locale}/login`,
  ADMIN_COMPANY_DETAIL: "/company-detail",
  LOGIN: `/login`,
  SETTINGS: "/settings",
  HOMEPAGE: "/",
  SIGNUP: "/signup",
  FORGET_PASSWORD: "/forget-password",
  LOGOUT: "/logout",
  NOTIFICATIONS: "#",
  POST_TENDER: "/post-tender",
  POST_PRODUCT_SERVICE: "/post-product-service",
  TENDERS: "/nhu-cau-thu-mua",
  PRODUCTS: "/san-pham",
  SERVICES: "/dich-vu",
  SUPPORT: "/ho-tro",
  COMPANIES: "/nha-cung-cap",
  COMPANY_DETAIL: "/company-details",
  ADMIN_LINK: `${process.env.NEXT_PUBLIC_ADMIN_URL}`,
  EMAIL_LINK: `https://gmail.com`,
  SUBSCRIPTION: "/subscription",
};

export const ALLOWED_UNAUTHENTICATED_ROUTES = [
  ROUTES.HOMEPAGE,
  ROUTES.SERVICES,
  ROUTES.PRODUCTS,
  ROUTES.COMPANIES,
];

export const SHOULD_UNATHETICATED_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.LOGOUT,
  ROUTES.SIGNUP,
  ROUTES.FORGET_PASSWORD,
];

export const NO_POST_ROUTES = [
  ROUTES.HOMEPAGE,
  ROUTES.COMPANIES,
  ROUTES.SUPPORT,
  ROUTES.SUBSCRIPTION,
];

export const MUST_AUTHENTICATED_ROUTES = [];
