import React from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import PageLayout from "@components/layouts/page-layout";
import { generateHeadTitle } from "@utils/seo-utils";

interface IMessagesPageProps {}

const MessagesPage: React.FC<IMessagesPageProps> = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{generateHeadTitle(t("messages"))}</title>
        <meta
          name="description"
          content="DSConnect.VN | The best B2B Ecommerce in Vietnam provide a fast supply demain chain to fit your need"
        />
      </Head>
      {/* <main> */}
      <MessagesPageContent />
      {/* </main> */}
    </>
  );
};

(MessagesPage as any).Layout = PageLayout;
export default MessagesPage;

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MessagesPageContent from "@components/ui/messages-page/messages-page-content";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
