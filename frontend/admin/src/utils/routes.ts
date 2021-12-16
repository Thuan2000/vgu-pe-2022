export const ROUTES = {
  HOMEPAGE: "/",

  DISCOVER_HOMEPAGE: `https://google.com/`,
  // DISCOVER_HOMEPAGE: `${process.env.NEXT_PUBLIC_DISCOVERY_ENDPOINT}/`,
  LOGIN: (locale?: string) =>
    `${process.env.NEXT_PUBLIC_DISCOVERY_ENDPOINT}${
      locale ? `/${locale}/` : `/`
    }login`,
  SIGNUP: (locale: string) =>
    `${process.env.NEXT_PUBLIC_DISCOVERY_ENDPOINT}${
      locale ? `/${locale}/` : `/`
    }signup`,
  FORGET_PASSWORD: "/forget-password",
  LOGOUT: "/logout",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
  POST_REQUEST: "/post-tender",
  POSTED_REQUESTS: "/posted-tenders",
  BUYING_REQUESTS: "/tenders",
  PROJECTS: "/projects",
  POST_PRODUCT_SERVICE: "/post-product-service",
  POSTED_PRODUCT_SERVICE: "/posted-product-service",
  SERVICES: "/services",
  EDIT_COMPANY: "/company-details",
};
