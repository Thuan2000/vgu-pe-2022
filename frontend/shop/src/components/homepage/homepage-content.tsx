import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import UnderDevelopment from "@components/under-development";
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
      <div className={`pb-10`}>
        <Typography
          text="IFrame here"
          size="xl"
          align="center"
          className={`py-20 text-4xl`}
        />
      </div>
    </div>
  );
};
export default HomepageContent;
