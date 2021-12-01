import AvatarIcon from "@assets/icons/avatar-icon";
import HomeIcon from "@assets/icons/navigations/home-icon";
import LogoutIcon from "@assets/icons/navigations/logout-icon";
import ProductIcon from "@assets/icons/navigations/product-icon";
import RequestIcon from "@assets/icons/navigations/request-icon";
import { ROUTES } from "@utils/routes";

export type INavigation = {
  label: string;
  href: string;
  icon?: any;
  children?: INavigation[];
  managedLinks?: string[];
};

export const requestChildren = [
  {
    label: "postRequest-nav-label",
    href: ROUTES.POST_REQUEST,
  },
  {
    label: "postedRequests-nav-label",
    href: ROUTES.POSTED_REQUESTS,
    managedLinks: [ROUTES.BUYING_REQUESTS],
  },
];

export const productChildren = [
  {
    label: "postProduct/Service-nav-label",
    href: ROUTES.POST_PRODUCT,
  },
];

export const navigations: INavigation[] = [
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
    label: "productService-nav-label",
    // This should be like this
    href: productChildren[0].href,
    icon: ProductIcon,
    children: productChildren,
  },
  {
    label: "editCompany-nav-label",
    // This should be like this
    href: ROUTES.EDIT_COMPANY,
    icon: AvatarIcon,
  },
  {
    label: "logout-nav-label",
    href: ROUTES.LOGOUT,
    icon: LogoutIcon,
  },
];
