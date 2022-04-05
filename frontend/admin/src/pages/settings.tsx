import PageLayout from "@components/layouts/page-layout";
import PostPageWrapper from "@components/post-page-wrapper";
import PostedServices from "@components/posted-product-service/posted-services";
import SettingGeneralForm from "@components/ui/setting-form/setting-general";
import UnderDevelopment from "@components/under-development";
import { PAGE_NAME } from "@utils/pagePath";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/dist/client/router";
import React from "react";
import SettingSecurityForm from "@components/ui/setting-form/setting-security";
import { useTranslation } from "next-i18next";

// const generalLabel = "settings-general-page-title";
// const securityLabel = "settings-security-page-title";
const generalLabel = "Thông tin chung";
const securityLabel = "An ninh";
const generalTarget = "general";
const securityTarget = "security";

interface ISettingsProps {}

const Settings: React.FC<ISettingsProps> = ({}) => {
  const { t } = useTranslation();

  const { query, ...router } = useRouter();
  const target = query.target;
  function getIsActiveGeneralNav(label: string) {
    return label === generalLabel && target !== securityTarget;
  }

  function getIsActiveSecurityNav(label: string) {
    return label === securityLabel && target === securityTarget;
  }

  function handleNavClick(label: string) {
    if (label === generalLabel && target !== securityTarget) return;
    if (label === securityLabel && target === securityTarget) return;

    const { pathname } = router;

    router.replace({
      pathname,
      query: {
        ...query,
        target: label === generalLabel ? generalTarget : securityTarget,
      },
    });
  }

  const settingsNavs = [
    {
      label: generalLabel,
      getIsActive: getIsActiveGeneralNav,
      onClick: handleNavClick,
    },
    {
      label: securityLabel,
      getIsActive: getIsActiveSecurityNav,
      onClick: handleNavClick,
    },
  ];

  return (
    <div>
      <PostPageWrapper noXPadding navs={settingsNavs}>
        {target === securityTarget ? (
          <SettingSecurityForm />
        ) : (
          <div>
            <SettingGeneralForm />
          </div>
        )}
      </PostPageWrapper>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;
  return {
    props: {
      query,
      ...(await serverSideTranslations(locale!, ["common", "form"])),
    },
  };
};

(Settings as any).Layout = PageLayout;
(Settings as any).PageName = PAGE_NAME.SETTINGS;

export default Settings;
