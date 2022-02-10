import { IBuyingRequest } from "@graphql/types.graphql";
import React from "react";
import BrcImage from "./brc-image";
import BrcInfo from "./brc-info";

interface IBuyingRequestCardProps {
  br: IBuyingRequest;
}

const BuyingRequestCard: React.FC<IBuyingRequestCardProps> = ({ br }) => {
  if (!br) return <></>;

  return (
    <div className="flex items-start border rounded-md overflow-hidden h-[150px]">
      <BrcImage gallery={br?.gallery as any} />
      <BrcInfo br={br} />
    </div>
  );
};
export default BuyingRequestCard;
