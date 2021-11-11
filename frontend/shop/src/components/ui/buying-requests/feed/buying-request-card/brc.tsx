import { IBuyingRequest } from "@graphql/types.graphql";
import React, { useEffect } from "react";
import BrcImage from "./brc-image";
import BrcInfo from "./brc-info";
import { useModal } from "src/contexts/modal.context";
import BiddingForm from "../../bidding-form";
import { getCompanyId } from "@utils/functions";
import { findIndex } from "lodash";

interface IBuyingRequestCardProps {
  br: IBuyingRequest;
}

const BuyingRequestCard: React.FC<IBuyingRequestCardProps> = ({ br }) => {
  const { openModal } = useModal();

  if (!br) return <></>;

  return (
    <div className="flex items-start border rounded-md pb-1">
      <BrcImage gallery={br?.gallery as any} />
      <BrcInfo br={br} />
    </div>
  );
};
export default BuyingRequestCard;
