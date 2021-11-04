import { IBuyingRequest } from "@graphql/types.graphql";
import React, { useEffect } from "react";
import BrcImage from "./brc-image";
import BrcInfo from "./brc-info";
import BrcFooter from "./brc-footer";
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

  function handleMessageClick() {}

  function handleBidClick() {
    openModal((<BiddingForm br={br} />) as any);
  }

  function handleContactClick() {}

  function isBidded() {
    const index = findIndex(br.bids, (bid) => {
      console.log(bid);
      return bid.company.id === getCompanyId();
    });

    return index !== -1;
  }

  return (
    <div className="flex items-start shadow-top-sm rounded-md pb-1">
      <BrcImage gallery={br?.gallery as any} />
      <div className="w-full ml-5 pt-1 pl-0">
        <BrcInfo br={br} />
        {br.company.id !== getCompanyId() && (
          <BrcFooter
            isBidded={isBidded()}
            handleMessageClick={handleMessageClick}
            handleBidClick={handleBidClick}
            handleContactClick={handleContactClick}
          />
        )}
      </div>
    </div>
  );
};
export default BuyingRequestCard;
