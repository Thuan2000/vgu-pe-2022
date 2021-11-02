import { useDiscoveryBuyingRequestsAndCountQuery } from "@graphql/buying-request.graphql";
import { IBrStatus, IBuyingRequest } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { brQueryParams } from "../query";
import BuyingRequestCard from "./buying-request-card";

interface IBuyingRequestsListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BuyingRequestsList: React.FC<IBuyingRequestsListProps> = (props) => {
  const { query } = useRouter();

  const searchValue = query.name as string;
  const location = query.location as string;
  const productName = query.productName as string;
  const industryId = parseInt(query.industry + "");
  const status = query.status as IBrStatus;
  const minBudget = query.minBudget as string;
  const maxBudget = query.maxBudget as string;

  const { data } = useDiscoveryBuyingRequestsAndCountQuery(
    brQueryParams({
      companyId: getCompanyId(),
      offset: 0,
      industryId,
      status,
      minBudget,
      maxBudget,
      productName,
      location,
      searchValue,
    }) as any
  );
  const brs = data?.discoveryBuyingRequestsAndCount.buyingRequests;
  return (
    <div {...props}>
      {brs &&
        brs.map((br) => {
          return (
            <BuyingRequestCard
              br={br as IBuyingRequest}
              key={br?.id + "br-card"}
            />
          );
        })}
    </div>
  );
};
export default BuyingRequestsList;
