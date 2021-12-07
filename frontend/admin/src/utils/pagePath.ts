import { ROUTES } from "./routes";

export const PAGE_NAME = {
  HOMEPAGE: "home-page-name",
  POST_REQUEST: "post-request-page-name",
  POSTED_REQUESTS: "posted-requests-page-name",
  CREATE_PROJECT: "create-project-page-name",
  POST_PRODUCT: "post-product-page-name",
  EDIT_COMPANY: "company-page-name",
};

export const PAGE_NAME_BY_ROUTE = {
  [ROUTES.HOMEPAGE]: PAGE_NAME.HOMEPAGE,
  [ROUTES.POST_REQUEST]: PAGE_NAME.POST_REQUEST,
  [ROUTES.POSTED_REQUESTS]: PAGE_NAME.POSTED_REQUESTS,
  ["/tenders"]: PAGE_NAME.POSTED_REQUESTS,
  [ROUTES.PROJECTS]: PAGE_NAME.POSTED_REQUESTS,
  [ROUTES.POST_PRODUCT]: PAGE_NAME.POST_PRODUCT,
  ["/[company-slug]"]: PAGE_NAME.EDIT_COMPANY,
};
