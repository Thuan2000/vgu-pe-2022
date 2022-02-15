import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import BannerSlider from "./banner-slider";
import BenefitItem from "./benefit-item";
import HCSearchBy from "./hc-search-by";
import { benefitMembers, partners, teamMembers } from "./homepage-contents";
import TeamMember from "./TeamMember";

interface IHomepageContentProps {}

function ContentWrapper({ className, children }: any) {
  return <div className={`${className} px-48`}>{children}</div>;
}

const HomepageContent: React.FC<IHomepageContentProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className={`space-y-5`}>
      <ContentWrapper>
        <BannerSlider />
      </ContentWrapper>

      <ContentWrapper className={`space-y-3`}>
        <Typography
          text={t("searchFor-text")}
          variant="bigTitle"
          size="xl"
          align="center"
        />
        <HCSearchBy />
      </ContentWrapper>

      <ContentWrapper>
        <div className="fic justify-between">
          <div className={`space-y-3`}>
            <Typography
              text={t("homepage-title")}
              weight="bold"
              className={`text-[40px]`}
              color="dark-blue"
            />
            <Typography
              color="dark-blue"
              text={t("homepage-subtitle")}
              size="lg"
            />
            <Button>{t("homepage-title-button")}</Button>
          </div>
          <div className={`relative mt-5 w-[850px] h-96`}>
            <Image
              src="https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/macbook-design.svg"
              layout="fill"
              objectFit="cover"
              alt="macbook-illustration"
            />
          </div>
        </div>
      </ContentWrapper>

      <div
        className={`object-cover py-16 bg-cover min-h-[500px] bg-no-repeat grid place-items-center`}
        style={{
          backgroundImage:
            "url(https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/second-section-backround.svg)",
        }}
      >
        <ContentWrapper className={`grid grid-cols-2 h-full`}>
          <div className={`flex-center`}>
            <div className={`relative w-[500px] h-[500px]`}>
              <Image
                src="https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/second-section-illustration.png"
                layout="fill"
                objectFit="cover"
                alt="second-section-illustration"
              />
            </div>
          </div>
          <div className={`space-y-3 flex flex-col justify-center items-start`}>
            <Typography
              text={t("second-section-title")}
              variant="homepageSectionTitle"
            />
            <Typography
              text={t("second-section-subtitle-first")}
              className={`max-w-[550px]`}
              size="md"
              color="dark-blue"
            />
            <Typography
              text={t("second-section-subtitle-second")}
              className={`max-w-[550px]`}
              size="md"
              color="dark-blue"
            />
            <Button>{t("homepage-title-button")}</Button>
          </div>
        </ContentWrapper>
      </div>

      <ContentWrapper className={`min-h-[500px] pb-20`}>
        <div>
          <Typography
            variant="homepageSectionTitle"
            text={t("who-we-are-title")}
          />
          {/* <Typography
            align="center"
            text={t("who-we-are-subtitle")}
            size="md"
          /> */}
        </div>

        <div className={`flex justify-between items-center mt-10`}>
          {teamMembers.map((t) => (
            <TeamMember {...t} key={t.name} />
          ))}
        </div>
      </ContentWrapper>

      <ContentWrapper className={`min-h-[400px] pb-20`}>
        <Typography variant="homepageSectionTitle" text={t("benefit-title")} />
        <Typography align="center" text={t("benefit-subtitle")} size="md" />
        <div className={`grid grid-cols-2 gap-x-10 px-24 gap-y-5 mt-8`}>
          {benefitMembers.map((bm) => (
            <BenefitItem key={bm.title} {...bm} title={t(bm.title)} />
          ))}
        </div>
      </ContentWrapper>

      <ContentWrapper className={`min-h-[400px] pb-20 `}>
        <Typography variant="homepageSectionTitle" text={t("partner-title")} />

        <div className={`grid grid-cols-4 gap-x-10 px-24 gap-y-5 mt-8`}>
          {partners.map((e) => {
            return (
              <div key={e.imgUrl} className={`relative w-52 h-52`}>
                <Image src={e.imgUrl} alt={e.imgUrl} layout="fill" />
              </div>
            );
          })}
        </div>
      </ContentWrapper>
    </div>
  );
};
export default HomepageContent;
