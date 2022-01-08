import { trimText } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../storybook/typography";

interface ICDDescProps {
  description: string;
}
const CDDesc: React.FC<ICDDescProps> = ({ description }) => {
  const { t } = useTranslation();
  return (
    <div className={`border p-3 rounded-md space-y-1`}>
      <Typography
        variant="smallTitle"
        element="h3"
        size="md"
        text={t("companyDetailInformation-title")}
      />

      <Typography
        variant="description"
        text={trimText(description || t("not-setup"), 370)}
      />
    </div>
  );
};
export default CDDesc;
