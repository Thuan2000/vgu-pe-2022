export function getChatUrl(chatId: string) {
  return `${ROUTES.CHAT_URL}/#/${chatId}`;
}

export const ROUTES = {
  TO_LOGIN: (locale: string) => `${locale}/login`,
  LOGIN: `/login`,
  SETTINGS: "/settings",
  HOMEPAGE: "/",
  SIGNUP: "/signup",
  FORGET_PASSWORD: "#",
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
  CHAT_URL: process.env.NEXT_PUBLIC_CHAT_URL,
  ADMIN_LINK: `${process.env.NEXT_PUBLIC_ADMIN_URL}`,
};
