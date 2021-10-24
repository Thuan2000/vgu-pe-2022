import React from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "@storybook/checkbox";
import Typography from "@storybook/typography";

interface IStatusProps extends React.HTMLAttributes<HTMLDivElement> {}

const StatusCheckbox: React.FC<IStatusProps> = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <Typography
        text={t("status-filter-label")}
        variant="smallTitle"
        className="mb-4"
      />
      <Checkbox
        className="mb-2"
        name="open-status"
        label={t("filter-status-open-filter")}
      />
      <Checkbox name="close-status" label={t("filter-status-close-filter")} />
    </div>
  );
};
export default StatusCheckbox;
