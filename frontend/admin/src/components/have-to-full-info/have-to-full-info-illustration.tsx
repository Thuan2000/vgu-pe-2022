import CircleDashIcon from "@assets/icons/circle-dash-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import PleaseEditCompanyButton from "./please-full-info-button";
import Typography from "../ui/storybook/typography";

interface IHaveToFullInfoIllustrationProps {}

const HaveToFullInfoIllustration: React.FC<
  IHaveToFullInfoIllustrationProps
> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className={`absolute z-50 flex-center left-0 right-0 mt-20`}>
      <div
        className={`bg-white border w-fit-content p-5 rounded-sm flex flex-col items-center space-y-2 text-center`}
      >
        <CircleDashIcon className={`w-28 h-28 mb-5`} fill={COLORS.DARK_BLUE} />

        <Typography
          text={t("please-edit-company-to-access-title")}
          weight="bold"
          size="xl"
        />
        <Typography
          text={t("please-edit-company-to-access-text")}
          className={`w-80`}
          size="md"
        />

        <PleaseEditCompanyButton />
      </div>
    </div>
  );
};
export default HaveToFullInfoIllustration;
