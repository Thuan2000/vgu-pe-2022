import { Instruction } from "./../components/ui/subscription/instruction";
import PageLayout from "@components/layouts/page-layout";
import Typography from "@components/ui/storybook/typography";
import ProBenefit from "@components/ui/subscription/pro-benefit";
import { ProPlans } from "@components/ui/subscription/pro-plans";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import TransferReceiptInput from "@components/ui/subscription/transfer-receipt-input";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "form",
        "category",
        "industry",
      ])),
    },
  };
};

interface ISubscribeProps {}

const Subscription: React.FC<ISubscribeProps> = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={`grid place-items-center space-y-2`}>
      <Typography
        align="center"
        text={t("subscription-plan-title")}
        weight="bold"
        size="xl"
      />

      <div className="fic space-x-5">
        <ProBenefit />
        <ProPlans />
      </div>
      <Instruction />
      <Typography text={t("subs-note")} color="gray-400" />

      <TransferReceiptInput />
    </div>
  );
};

(Subscription as any).Layout = PageLayout;

export default Subscription;
