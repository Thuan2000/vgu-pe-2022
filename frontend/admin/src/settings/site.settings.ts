import FacebookGrayIcon from "@assets/icons/socials/facebook-gray-icon";
import InstagramGrayIcon from "@assets/icons/socials/instagram-gray-icon";

export const siteSettings = {
  appName: "SDConnect",
  description: "",
  logo: {
    url: "/logo.svg",
    alt: "DSConnectVN",
    href: "/",
    width: 256,
    height: 70,
  },
  defaultLanguange: "en",
  author: {
    name: "Emolyze.tech",
    websiteUrl: "https://emolyze.tech",
    address: "",
  },
  navigations: [
    {
      label: "Trang chủ",
      href: "#",
    },
    {
      label: "Suppliers",
      href: "#",
    },
    {
      label: "Nhu cầu mua",
      href: "#",
    },
    {
      label: "Sản phẩm",
      href: "#",
    },
    {
      label: "Blog",
      href: "#",
    },
    {
      label: "Hỗ trợ",
      href: "#",
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
