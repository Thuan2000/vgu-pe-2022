import HomeIcon from "@assets/icons/navigations/home-icon";
import LogoutIcon from "@assets/icons/navigations/logout-icon";
import RequestIcon from "@assets/icons/navigations/request-icon";
import { ROUTES } from "@utils/routes";

export const requestChildren = [
  {
    label: "postRequest-nav-label",
    href: ROUTES.POST_REQUEST,
  },
  {
    label: "postedRequests-nav-label",
    href: ROUTES.POSTED_REQUESTS,
  },
];

export const navigations = [
  {
    label: "home-nav-label",
    href: ROUTES.HOMEPAGE,
    icon: HomeIcon,
  },
  {
    label: "request-nav-label",
    // This should be like this
    href: requestChildren[0].href,
    icon: RequestIcon,
    children: requestChildren,
  },
  {
    label: "logout-nav-label",
    href: ROUTES.LOGOUT,
    icon: LogoutIcon,
  },
];

// Sidebar content
export const SC_LEFT_SPACING = "11";
