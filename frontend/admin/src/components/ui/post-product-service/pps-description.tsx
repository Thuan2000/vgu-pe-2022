import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../storybook/typography";

interface IPPSDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

const PPSDescription: React.FC<IPPSDescriptionProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation("form");

  return (
    <div className="description">
      <Typography
        variant="pageTitle"
        size="lg"
        text={t("postProduct-content-title")}
      />
      <Typography
        variant="description"
        text={t("postProduct-content-subtitle")}
      />
    </div>
  );
};
export default PPSDescription;
