import FacebookGrayIcon from "@assets/icons/socials/facebook-gray-icon";
import InstagramGrayIcon from "@assets/icons/socials/instagram-gray-icon";

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
  author: {
    name: "Emolyze.tech",
    websiteUrl: "https://emolyze.tech",
    address: "",
  },
  navigations: [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "Danh bạ công ty",
      href: "/danh-ba-cong-ty",
    },
    {
      label: "Nhu cầu thu mua",
      href: "/nhu-cau-thu-mua",
    },
    {
      label: "Sản phẩm / Dịch vụ",
      href: "/san-pham-dich-vu",
    },
    {
      label: "Hỗ trợ",
      href: "/ho-tro",
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
