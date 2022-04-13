import { useCompanySubscriptionQuery } from "@graphql/subscription-company.graphql";
import { ICompanySubscription } from "@graphql/types.graphql";
import { getCompanyId, removeTypename } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface ISubInfo extends ICompanySubscription {
  isSubscribing: boolean;
}

const SubInfoCtx = React.createContext<ISubInfo | {}>({});

export const SubsInfoProvider: React.FC<any> = ({ children }) => {
  const { t } = useTranslation();
  const { replace, locale } = useRouter();
  const { data: raw } = useCompanySubscriptionQuery({
    variables: { companyId: getCompanyId() },
    skip: !getCompanyId(),
  });

  const companySubscription: ICompanySubscription =
    removeTypename(raw).companySubscription;

  const isSubscribing = !!companySubscription;

  useEffect(() => {
    const isExpired = companySubscription?.endAt < new Date().getTime();
    async function subscribeAlert() {
      const data = await Swal.fire({
        icon: "error",
        title: t("please-subscribe-title"),
        text: t("please-subscribe-message"),
        confirmButtonText: t("please-subscribe-button-label"),
      });

      if (data) replace(ROUTES.SUBSCRIPTION(locale as string));
    }

    if (isExpired) subscribeAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companySubscription]);

  const value: ISubInfo = {
    isSubscribing,
    ...removeTypename(companySubscription),
  };

  return <SubInfoCtx.Provider value={value}>{children}</SubInfoCtx.Provider>;
};

export const useSubsInfo = () => {
  const ctx = useContext(SubInfoCtx);

  if (ctx === undefined) throw "Please wrap this on SubsInfoProvider";
  return ctx as ISubInfo;
};
