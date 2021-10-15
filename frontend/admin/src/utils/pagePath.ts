import { ROUTES } from "./routes";

export const PAGE_NAME = {
  HOMEPAGE: "home-page-name",
  POST_REQUEST: "post-request-page-name",
  POSTED_REQUESTS: "posted-requests-page-name",
  CREATE_PROJECT: "create-project-page-name",
};

export const PAGE_NAME_BY_ROUTE = {
  [ROUTES.HOMEPAGE]: PAGE_NAME.HOMEPAGE,
  [ROUTES.POST_REQUEST]: PAGE_NAME.POST_REQUEST,
  [ROUTES.POSTED_REQUESTS]: PAGE_NAME.POSTED_REQUESTS,
  ["/buying-requests"]: PAGE_NAME.POSTED_REQUESTS,
};
