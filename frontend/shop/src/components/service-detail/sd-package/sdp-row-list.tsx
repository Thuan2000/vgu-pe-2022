import React from "react";
import { SDP_PACKAGE_PRICE_NAME } from "../sd-packages";
import SDPTableItemWrapper from "./sdp-item-wrapper";
import SDPRowHeadItem from "./sdp-row-head-item";

interface ISDPRowListProps {
  rows: any;
}

const SDPRowList: React.FC<ISDPRowListProps> = ({ rows }) => {
  let priceRow = {};

  return (
    <div className="w-1/4 flex-shrink-0">
      <SDPTableItemWrapper isHead className="border-b" />
      {rows.map((r: any) => {
        if (r.name === SDP_PACKAGE_PRICE_NAME) {
          priceRow = r;
          return;
        }
        return <SDPRowHeadItem key={r.id + "row-list-ppi"} row={r} />;
      })}
      <SDPRowHeadItem
        key={"package-price-row" + "row-list-ppi"}
        row={priceRow as any}
      />
    </div>
  );
};
export default SDPRowList;
