import FacebookGrayIcon from "@assets/icons/socials/facebook-gray-icon";
import InstagramGrayIcon from "@assets/icons/socials/instagram-gray-icon";
import { ROUTES } from "@utils/routes";
import AvatarIcon from "@assets/Avatars.svg";
import ProfilePlaceholder from "@assets/company-profile-placeholder.svg";

export const siteSettings = {
  appName: "SDConnect",
  description: "",
  logo: {
    url: "/logo.svg",
    alt: "SDConnect.VN Logo",
    href: "/",
    width: 225,
    height: 60,
  },
  defaultLanguange: "vi",
  imagePlaceholder: AvatarIcon,
  placeholderImage:
    "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/image-placeholder.jpg",
  companyProfileImagePlaceholder: ProfilePlaceholder,
  accountNumber: "3703009192",
  bankInfo: "MB Bank (NH Quân đội)",
  author: {
    name: "Emolyze.tech",
    websiteUrl: "https://emolyze.tech",
    address: "",
  },
  navigations: [
    {
      label: "HOMEPAGE_NAV_LABEL",
      href: ROUTES.HOMEPAGE,
    },
    {
      label: "COMPANY_NAV_LABEL",
      href: ROUTES.COMPANIES,
    },
    {
      label: "TENDER_NAV_LABEL",
      href: ROUTES.TENDERS,
    },
    {
      label: "PRODUCT_NAV_LABEL",
      href: ROUTES.PRODUCTS,
    },
    {
      label: "SERVICES_NAV_LABEL",
      href: ROUTES.SERVICES,
    },
    // {
    //   label: "SUPPORT_NAV_LABEL",
    //   href: ROUTES.SUPPORT,
    // },
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
