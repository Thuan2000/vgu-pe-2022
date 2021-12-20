import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "@storybook/typography";

interface IEndDateCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {}

const EndDateCheckbox: React.FC<IEndDateCheckboxProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <Typography
        text={t("dueDate-filter-label")}
        variant="smallTitle"
        className="mb-4"
      />
    </div>
  );
};
export default EndDateCheckbox;
