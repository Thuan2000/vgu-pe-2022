import FilterIcon from "@assets/icons/filter-icon";
import PageLayout from "@components/layouts/page-layout";
import BuyingRequestsList from "@components/ui/buying-requests/feed/buying-requests-list";
import BudgetRange from "@components/ui/buying-requests/filter/budget-range";
import IndustrySelect from "@components/ui/buying-requests/filter/industry-select";
import LocationSearch from "@components/ui/buying-requests/filter/location-search";
import ProductSearch from "@components/ui/buying-requests/filter/product-search";
import StatusCheckbox from "@components/ui/buying-requests/filter/status-checkbox";
import Typography from "@components/ui/storybook/typography";
import UnderDevelopment from "@components/under-development";
import { getAuthCredentials, isAuthenticated } from "@utils/auth-utils";
import { COLORS } from "@utils/colors";
import { ROUTES } from "@utils/routes";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useTranslation } from "react-i18next";
import useIsPhone from "src/hooks/isPhone.hook";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, role } = getAuthCredentials(ctx);

  const { locale } = ctx;

  if (!token || !role || !isAuthenticated({ token, role })) {
    return {
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};

const BuyingRequests: React.FC = () => {
  const { t } = useTranslation();

  const isPhone = useIsPhone();

  if (isPhone)
    return (
      <div>
        <UnderDevelopment />
      </div>
    );

  return (
    <div className="flex space-x-5 pb-10">
      <div className="hidden sm:block space-y-6">
        <div className="flex items-center w-[250px]">
          <FilterIcon fill={COLORS.PRIMARY.DEFAULT} className="mr-4" />
          <Typography text={t("filter-label")} variant="special-heading" />
        </div>
        <LocationSearch />
        <StatusCheckbox />
        {/* <EndDateCheckbox /> */}
        <ProductSearch />
        <IndustrySelect />
        <BudgetRange />
      </div>

      <BuyingRequestsList className="w-full space-y-4" />
    </div>
  );
};

(BuyingRequests as any).Layout = PageLayout;

export default BuyingRequests;
