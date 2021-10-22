import { useDiscoveryBuyingRequestsAndCountQuery } from "@graphql/buying-request.graphql";
import { IBuyingRequest } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";
import React from "react";
import BuyingRequestCard from "./buying-request-card";

interface IBuyingRequestsListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BuyingRequestsList: React.FC<IBuyingRequestsListProps> = (props) => {
  const { data } = useDiscoveryBuyingRequestsAndCountQuery({
    variables: { companyId: getCompanyId(), offset: 0 },
  });
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
