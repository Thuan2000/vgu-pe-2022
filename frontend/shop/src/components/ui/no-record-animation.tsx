import NoServiceFoundIcon from "@assets/icons/no-service-found-icon";
import { isEmpty } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import Button from "./storybook/button";
import Typography from "./storybook/typography";

interface INoRecordAnimationProps {
  text: string;
}

const NoRecordAnimation: React.FC<INoRecordAnimationProps> = ({ text }) => {
  const { t } = useTranslation();

  const { pathname, query, replace } = useRouter();

  const isHasQuery = !isEmpty(query);

  function removeQuery() {
    replace({
      pathname,
      query: {},
    });
  }

  return (
    <div className={`grid place-items-center space-y-2`}>
      <NoServiceFoundIcon />
      <Typography text={text} size="lg" weight="semibold" />

      <div className={`flex space-x-2`}>
        {isHasQuery && (
          <Button onClick={removeQuery} variant="cancel">
            {t("clear-query")}
          </Button>
        )}
        <Button>{t("to-homepage")}</Button>
      </div>
    </div>
  );
};
export default NoRecordAnimation;
