import Typography from "@components/ui/storybook/typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface IPPSProductInlineLabelProps {
  label: string;
}

const PPSProductInlineLabel: React.FC<IPPSProductInlineLabelProps> = ({
  label,
}) => {
  return (
    <Typography
      weight="bold"
      color="black"
      className={`flex-shrink-0`}
      text={`${label} : `}
    />
  );
};
export default PPSProductInlineLabel;
