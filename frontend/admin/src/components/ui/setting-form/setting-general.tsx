import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "../storybook/typography";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import { ROUTES } from "@utils/routes";
import DownVIcon from "@assets/icons/down-v-icon";

interface ISettingGeneralFormProps {}

const SettingGeneralForm: React.FC<ISettingGeneralFormProps> = () => {
  const { t } = useTranslation("common");
  const { query, ...router } = useRouter();

  return (
    <div className="space-y-2 mx-5">
      <Typography
        text={t("setting-subcription-plan-label")}
        align="left"
        variant="bigTitle"
      />
      <div className="border border-gray-100 rounded-sm fic justify-between p-10 cursor-pointer grid grid-cols-2 justify-between">
        <p className="font-semibold text-semibold text-2xl mb-2">
          {t("seller-account")}{" "}
        </p>

        <p className="font-semibold text-semibold text-2xl mb-2 col-end-3 flex justify-end">
          /{t("year-label")}{" "}
        </p>

        <p className="text-lg mb-2 col-start-1">{t("setting-remaining-end")}</p>
        <p className="text-lg text-gray-300 col-start-1">
          {t("setting-trancation-id-label")}:{" "}
        </p>

        <p className="text-lg text-gray-300 col-start-1 mt-10">
          {t("setting-this-plan-was-bought-on")}{" "}
        </p>
        <div className="mt-10 flex justify-end">
          <Link href={ROUTES.SETTINGS}>
            <Button size="small" className="md:w-1/1 ml-2">
              {t("renew-sub-button")}
            </Button>
          </Link>
        </div>
      </div>
      <Typography
        text={t("setting-billing-history-label")}
        align="left"
        variant="bigTitle"
      />
      <div className="fic justify-between p-2 cursor-pointer grid grid-cols-4 justify-between">
        <div className="grid grid-cols-3 ml-3">
          <p className="text-lg text-gray-300 col-span-2">
            {t("setting-billing-date-label")}
          </p>
          <DownVIcon className="mt-2" />
        </div>

        <div className="grid grid-cols-3 ml-11">
          <p className="text-lg text-gray-300 col-span-2">
            {t("setting-billing-subcription-label")}
          </p>
          <DownVIcon className="mt-2" />
        </div>

        <div className="grid grid-cols-3 ml-9">
          <p className="text-lg text-gray-300 col-span-2">
            {t("setting-billing-transaction-label")}
          </p>
          <DownVIcon className="mt-2" />
        </div>

        <div className="grid grid-cols-3 ml-11">
          <p className="text-lg text-gray-300 col-span-2">
            {t("setting-billing-price-label")}
          </p>
          <DownVIcon className="mt-2" />
        </div>
      </div>
      <div className="border border-gray-100 rounded-sm fic justify-between p-5 cursor-pointer grid grid-cols-4 justify-between">
        <p className="text-lg text-gray-300 ">January 18, 2020, 8:25:29 PM </p>
        <p className="font-semibold text-semibold text-lg mx-10">
          Seller Account
        </p>
        <p className="text-lg mx-10">ASd199932103</p>
        <p className="font-semibold text-semibold text-lg mx-14">
          VND 100.000.000
        </p>
      </div>

      <Typography
        text={t("setting-lang-label")}
        align="left"
        variant="bigTitle"
      />
      <p className="font-semibold text-semibold text-gray-300 text-lg">
        {t("setting-lang-title")}
      </p>
      <div className="flex flex-row justify-end">
        <Link href={ROUTES.LOGOUT}>
          <Button variant="cancel" size="small" className="md:w-1/1">
            {t("cancel-button")}
          </Button>
        </Link>
        <Link href={ROUTES.SETTINGS}>
          <Button size="small" className="md:w-1/1 ml-2">
            {t("save-button")}
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default SettingGeneralForm;
