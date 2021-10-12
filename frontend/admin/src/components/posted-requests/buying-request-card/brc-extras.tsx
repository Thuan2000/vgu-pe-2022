import ThreeDotIcon from "@assets/icons/three-dot-icon";
import { viDateFormat } from "@utils/functions";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface IBrcExtrasProps extends React.HTMLAttributes<HTMLDivElement> {
  updatedAt: string;
}

const BrcExtras: React.FC<IBrcExtrasProps> = ({ updatedAt, ...props }) => {
  const { t } = useTranslation();

  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);

  return (
    <div {...props}>
      <div className="flex items-center w-full pr-6">
        <div className="flex items-center">
          <h5 className="text-gray mr-1 md:text-sm">{t("posted-label")}:</h5>
          <h5 className="text-secondary-1 md:text-sm">
            {viDateFormat(updatedAt)}
          </h5>
        </div>
        <div className="ml-auto relative">
          <button
            onFocus={() => setShowThreeDotMenu(!showThreeDotMenu)}
            onBlur={() => setShowThreeDotMenu(false)}
          >
            <ThreeDotIcon />
          </button>
          <div
            className={`border bg-white absolute right-0 z-50 rounded-md w-36 ${
              showThreeDotMenu ? "block" : "hidden"
            }`}
          >
            <ul>
              <li className="border-b pl-2 py-2 w-full">Add to project</li>
              <li className="pl-2 py-2 w-full">Add to project</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BrcExtras;
