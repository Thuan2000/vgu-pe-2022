import React from "react";
import PageLayout from "@components/layouts/page-layout";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SettingPageWrapper from "../components/setting-page-wrapper";
import SettingGeneralForm from "../components/ui/setting-form/setting-general";

export const postRequestNavs = [
    {
      label: "general-nav-label",
    },
    {
      label: "security-nav-label",
    },
];
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { locale } = ctx;
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "common",
                "form",
            ])),
        },
    };
};

const Settings = () => {
    const { t } = useTranslation("common");
    return (
        <div>
            <SettingPageWrapper navs={postRequestNavs}>
                <SettingGeneralForm />
            </SettingPageWrapper>
        </div>
    );
};

Settings.Layout = PageLayout;
export default Settings;
