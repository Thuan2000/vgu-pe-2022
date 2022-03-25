import React from "react";
import Image from "next/image";
import BankLogo from "@assets/bank-logo.png";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import Typography from "../storybook/typography";

export function Instruction({}) {
  const { t } = useTranslation();
  return (
    <div className={`!mt-10`}>
      <Typography
        align="center"
        text={t("subscribe-instruction-title")}
        weight="bold"
        size="xl"
      />
      <Typography
        align="center"
        text={t("subscribe-instruction-subtitle")}
        color="gray"
        size="md"
      />
      <div className="fic space-x-2">
        <div className={`relative w-40 h-36`}>
          <Image src={BankLogo} layout="fill" alt="bank-logo" />
        </div>
        <div className={`space-y-1`}>
          <Typography
            text={t("company-account-title")}
            weight="bold"
            size="lg"
          />
          <div className="fic space-x-1">
            <Typography text={`${t("bank-text")}:`} />
            <Typography
              text={`${siteSettings.bankInfo} ${t("bank-answer")}`}
              weight="bold"
            />
          </div>
          <div className="fic space-x-1">
            <Typography text={`${t("account-number-text")}:`} />
            <Typography
              text={siteSettings.accountNumber}
              weight="bold" // size="lg"
            />
          </div>
          <div className="fic space-x-1">
            <Typography text={`${t("content-text")}:`} />
            <Typography
              text={t("content-text-answer")}
              weight="bold" // size="lg"
            />
          </div>
          <div className="fic space-x-1">
            <Typography
              color="gray"
              size="xs"
              text={`${t("question-text")}:`}
            />
            <Typography
              color="gray"
              size="xs"
              text={t("0702845158 hello@sdconnect.vn")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
