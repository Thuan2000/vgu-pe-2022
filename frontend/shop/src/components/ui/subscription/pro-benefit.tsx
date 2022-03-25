import CheckmarkIcon from "@assets/icons/checkmark-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import Button from "../storybook/button";
import Typography from "../storybook/typography";

interface IProBenefitProps {}

const ProBenefit: React.FC<IProBenefitProps> = ({ ...props }) => {
  const { t } = useTranslation();

  const benefits = [
    "benefit-admin-access",
    "benefit-search-request",
    "benefit-search-request",
    "benefit-chat-access",
  ];

  return (
    <div className="fic rounded-sm border-gray-200 overflow-hidden border">
      <div className={`sm:w-[470px]`}>
        <div className="bg-primary py-4">
          <Typography
            text={t("pro-benefit-title")}
            weight="semibold"
            color="white"
            align="center"
            size="lg"
          />
        </div>

        <div className={`px-16 py-7`}>
          <div className={`space-y-5 mb-5`}>
            {benefits.map((b) => {
              return (
                <div key={b} className={`fic space-x-4`}>
                  <CheckmarkIcon fill={COLORS.PRIMARY.DEFAULT} />
                  <Typography key={b} size="sm" text={t(b)} />
                </div>
              );
            })}
          </div>
          <div className="w-full text-center">
            <Button className={``}>{t("subscribe-now-button-label")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProBenefit;
