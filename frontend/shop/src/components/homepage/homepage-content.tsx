import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React from "react";
import BannerSlider from "./banner-slider";
import HCSearchBy from "./hc-search-by";

interface IHomepageContentProps {}

const HomepageContent: React.FC<IHomepageContentProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className={`space-y-5`}>
      <BannerSlider />

      <div className={`space-y-3`}>
        <Typography
          text={t("searchFor-text")}
          variant="bigTitle"
          size="xl"
          align="center"
        />
      </div>

      <HCSearchBy />
      <div className={`pb-10 w-full`}>
        <iframe
          src="https://iframe.sdconnect.vn"
          className={`w-full min-h-[600px]`}
        />
      </div>
    </div>
  );
};
export default HomepageContent;
