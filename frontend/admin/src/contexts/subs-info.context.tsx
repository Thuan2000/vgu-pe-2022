import { useCompanySubscriptionQuery } from "@graphql/subscription-company.graphql";
import { ICompanySubscription } from "@graphql/types.graphql";
import { getCompanyId, removeTypename } from "@utils/functions";
import React, { useContext } from "react";

interface ISubInfo extends ICompanySubscription {
  isSubscribing: boolean;
}

const SubInfoCtx = React.createContext<ISubInfo | {}>({});

export const SubsInfoProvider: React.FC<any> = ({ children }) => {
  const { data: raw } = useCompanySubscriptionQuery({
    variables: { companyId: getCompanyId() },
    skip: !getCompanyId(),
  });

  const companySubscription: ICompanySubscription =
    removeTypename(raw).companySubscription;

  const isSubscribing = !!companySubscription;

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
