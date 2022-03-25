import { ILocale } from "@graphql/types.graphql";
import { getNameByLocale } from "@utils/constants";
import { getSubscriptionInfoText } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import { useSubsInfo } from "src/contexts/subs-info.context";
import Link from "./link";
import Typography from "./storybook/typography";

interface ISubscriptionInfoTextProps {
  stack?: "column" | "row";
}

export function SubscriptionInfoText({
  stack = "row",
}: ISubscriptionInfoTextProps) {
  const { t } = useTranslation();
  const { locale = "" } = useRouter();
  const { isTrial, endAt, ...rest } = useSubsInfo();

  const name = (rest as any)[getNameByLocale[locale as ILocale]];

  return (
    <div className={`${stack === "column" ? "space-y-1" : "fic space-x-1"}`}>
      <Typography
        text={getSubscriptionInfoText(t, name, endAt)}
        size="xs"
        weight="semibold"
        className={`px-1 bg-opacity-20 rounded-sm bg-secondary-1 text-secondary-1
          ${!isTrial && "bg-yellow-200"} 
          ${!isTrial && "text-yellow-200"} 
        `}
      />

      <Link href={ROUTES.SUBSCRIPTION} target={"_blank"} rel="noreferrer">
        <Typography
          text={t(isTrial ? "upgrade-now-text" : "extend-now-text")}
          color="gray-400"
          size="sm"
          underline
        />
      </Link>
    </div>
  );
}
