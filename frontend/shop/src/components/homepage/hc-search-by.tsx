import { ROUTES } from "@utils/routes";
import React from "react";
import HCSearchByItem from "./hc-search-by-item";

interface IHCSearchByProps {}

export type HomepageSearchByKeyword =
  | "product"
  | "service"
  | "tender"
  | "company";

export interface HomepageSearchBy {
  href: string;
  keyword: HomepageSearchByKeyword;
}

const HCSearchBy: React.FC<IHCSearchByProps> = ({}) => {
  const searchByItems: HomepageSearchBy[] = [
    { href: `${ROUTES.PRODUCT_SERVICES}`, keyword: "product" },
    { href: `${ROUTES.PRODUCT_SERVICES}`, keyword: "service" },
    { href: `${ROUTES.TENDERS}`, keyword: "tender" },
    { href: `${ROUTES.COMPANIES}`, keyword: "company" },
  ];

  return (
    <div className={`grid grid-cols-4 gap-x-10`}>
      {searchByItems.map((sbi) => (
        <HCSearchByItem item={sbi} key={sbi + "search-by-homepage"} />
      ))}
    </div>
  );
};
export default HCSearchBy;
