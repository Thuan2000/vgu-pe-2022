import React from "react";
import PPITableItemWrapper from "./ppi-table-item-wrapper";

interface IPPIEmptyPrProps {}

const PPIEmptyPr: React.FC<IPPIEmptyPrProps> = ({}) => {
  return (
    <PPITableItemWrapper className="border-dashed border-secondary-1 border bg-secondary-1 bg-opacity-12" />
  );
};
export default PPIEmptyPr;
