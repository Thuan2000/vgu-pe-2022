import React from "react";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import SiteSocials from "@components/ui/site-socials";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import Typography from "@components/ui/storybook/typography";

interface IFooterProps {}

const footerRightLinks = [{ href: ROUTES.SUPPORT, label: "SUPPORT_NAV_LABEL" }];

const footerLeftLinks = [
  { href: ROUTES.HOMEPAGE, label: "HOMEPAGE_NAV_LABEL" },
  { href: ROUTES.COMPANIES, label: "COMPANY_NAV_LABEL" },
  { href: ROUTES.TENDERS, label: "TENDER_NAV_LABEL" },
  { href: ROUTES.PRODUCTS, label: "PRODUCT_NAV_LABEL" },
  { href: ROUTES.SERVICES, label: "SERVICES_NAV_LABEL" },
];

const Footer: React.FC<IFooterProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className={`bg-gray-10 z-10 pb-6 relative sm:px-48`}>
      <div className={` grid pt-12 pb-8 align-top  grid-cols-6 `}>
        <Logo size="medium" className="-translate-y-2" />
        <div className={`col-span-4 flex space-x-24`}>
          <div>
            {footerLeftLinks.map((fll) => (
              <Link className="py-5" href={fll.href} key={fll.href + fll.label}>
                <Typography
                  variant="description"
                  size="md"
                  className={`pb-5`}
                  text={t(fll.label)}
                />
              </Link>
            ))}
          </div>
          <div>
            {footerRightLinks.map((fll) => (
              <Link className="py-5" href={fll.href} key={fll.href + fll.label}>
                <Typography
                  variant="description"
                  size="md"
                  className={`pb-5`}
                  text={t(fll.label)}
                />
              </Link>
            ))}
          </div>
        </div>
        <p className={`text-right`}>
          <SiteSocials />
        </p>
        {/* <div className="relative w-10 h-5">
          <Image
            layout="fill"
            src={siteSettings.logo.url}
            alt={siteSettings.appName}
          />
        </div> */}
      </div>
      © 2021 Copyright SDConnect.vn
    </div>
  );
};
export default Footer;
