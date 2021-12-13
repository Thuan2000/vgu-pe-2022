import React from "react";
import SDPPackageList from "./sd-package/sdp-package-list";
import SDPRowList from "./sd-package/sdp-row-list";

interface ISDPackagesProps {
  packages: any;
  rows: any;
}

export const SDP_PACKAGE_PRICE_NAME = "PACKAGE_PRICE_LABEL";

const SDPackages: React.FC<ISDPackagesProps> = ({ packages, rows }) => {
  return (
    <div className="space-y-2 select-none">
      <div className="text-center border rounded-sm flex">
        <SDPRowList rows={rows} />
        <SDPPackageList rows={rows} packages={packages} />
      </div>
    </div>
  );
};
export default SDPackages;
