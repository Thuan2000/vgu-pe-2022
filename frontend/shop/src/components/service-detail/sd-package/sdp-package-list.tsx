import React from "react";
import SDPPackageItem from "./sdp-package-item";

interface ISDPPackageListProps {
  packages: any;
  rows: any;
}

const SDPPackageList: React.FC<ISDPPackageListProps> = ({ packages, rows }) => {
  return (
    <div className="w-full flex overflow-x-auto">
      {packages?.map((pkg: any, idx: number) => {
        return (
          <SDPPackageItem
            key={pkg.id + "package-list"}
            pkg={pkg}
            idx={idx}
            // onePackageOnly={packages.length === 1}
            // value={getValuedPkg(pkg)}
            rows={rows}
            // packagePriceRow={packagePriceRow}
          />
        );
      })}
    </div>
  );
};
export default SDPPackageList;
