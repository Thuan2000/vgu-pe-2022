import AvatarIcon from "@assets/icons/avatar-icon";
import HomeIcon from "@assets/icons/navigations/home-icon";
import LogoutIcon from "@assets/icons/navigations/logout-icon";
import MessageIcon from "@assets/icons/message-icon";
import ProductIcon from "@assets/icons/navigations/product-icon";
import RequestIcon from "@assets/icons/navigations/request-icon";
import SettingsIcon from "@assets/icons/navigations/settings-icon";
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
    href: ROUTES.POST_PRODUCT_SERVICE,
  },
  {
    label: "postedProduct/Service-nav-label",
    href: ROUTES.POSTED_PRODUCT_SERVICE,
    managedLinks: [ROUTES.PRODUCTS, ROUTES.SERVICES],
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
    label: "companyPage-nav-label",
    href: ROUTES.COMPANY_DETAIL,
    icon: AvatarIcon,
  },
  {
    label: "message-nav-label",
    href: ROUTES.MESSAGES,
    icon: MessageIcon,
  },
];

export const settingSidebar = {
  label: "setting-nav-label",
  managedLinks: [],
  icon: SettingsIcon,
};

export const bottomNavigations = [
  {
    label: "setting-nav-label",
    managedLinks: [],
    href: ROUTES.SETTINGS,
    icon: SettingsIcon,
  },
  {
    label: "logout-nav-label",
    managedLinks: [],
    href: ROUTES.LOGOUT,
    icon: LogoutIcon,
  },
];
