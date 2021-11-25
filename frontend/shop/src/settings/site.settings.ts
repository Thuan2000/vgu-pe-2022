import FacebookGrayIcon from "@assets/icons/socials/facebook-gray-icon";
import InstagramGrayIcon from "@assets/icons/socials/instagram-gray-icon";
import { ROUTES } from "@utils/routes";
import AvatarIcon from "@assets/Avatars.svg";

export const siteSettings = {
  appName: "SDConnect",
  description: "",
  logo: {
    url: "/logo.svg",
    alt: "SDConnect.VN Logo",
    href: "/",
    width: 256,
    height: 70,
  },
  defaultLanguange: "vi",
  imagePlaceholder: AvatarIcon,
  author: {
    name: "Emolyze.tech",
    websiteUrl: "https://emolyze.tech",
    address: "",
  },
  navigations: [
    {
      label: "Trang chủ",
      href: ROUTES.HOMEPAGE,
    },
    {
      label: "Danh bạ công ty",
      href: ROUTES.COMPANIES,
    },
    {
      label: "Nhu cầu thu mua",
      href: ROUTES.TENDERS,
    },
    {
      label: "Sản phẩm / Dịch vụ",
      href: ROUTES.PRODUCT_SERVICES,
    },
    {
      label: "Hỗ trợ",
      href: ROUTES.SUPPORT,
    },
  ],
  socials: [
    {
      social: "facebook",
      label: "SDConnect.VN",
      icon: FacebookGrayIcon,
      href: "https://facebook.com/sdconnect.vn",
    },
    {
      social: "facebook",
      label: "@SDConnect.VN",
      icon: InstagramGrayIcon,
      href: "https://instagram.com/sdconnect.vn",
    },
  ],
};
