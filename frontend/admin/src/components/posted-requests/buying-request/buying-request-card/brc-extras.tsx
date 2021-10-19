import ThreeDotIcon from "@assets/icons/three-dot-icon";
import { IBuyingRequest } from "@graphql/types.graphql";
import { COLORS } from "@utils/colors";
import { viDateFormat } from "@utils/functions";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IExtraMenu } from "./buying-request-card";

interface IBrcExtrasProps extends React.HTMLAttributes<HTMLDivElement> {
  updatedAt: string;
  br: IBuyingRequest;
  extraMenus: IExtraMenu[];
}

const BrcExtras: React.FC<IBrcExtrasProps> = ({
  br,
  updatedAt,
  extraMenus,
  ...props
}) => {
  const { t } = useTranslation();

  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);

  return (
    <div {...props}>
      <div className="flex items-center w-full pr-6">
        <div className="flex items-center">
          {/* <h5 className="text-gray mr-1 md:text-sm">{postedTextLabel}:</h5> */}
          <h5 className="text-secondary-1 md:text-sm">
            {viDateFormat(updatedAt)}
          </h5>
        </div>
        <div className="ml-auto relative">
          {extraMenus.length > 0 && (
            <button
              className="p-1 pb-0"
              onClick={() => setShowThreeDotMenu(true)}
              onBlur={() => setShowThreeDotMenu(false)}
            >
              <ThreeDotIcon />
              {showThreeDotMenu && (
                <div
                  className={`border min-w-[215px] bg-white absolute right-0 z-50 rounded-md`}
                >
                  <ul>
                    {extraMenus.map(({ label, icon: Icon, onClick }) => {
                      return (
                        <li
                          className="border-b border-gray-100"
                          key={label + "menu"}
                        >
                          <div
                            className="pl-7 flex py-4 items-center w-full h-full"
                            onClick={() => onClick(br)}
                          >
                            <Icon
                              className="ml-1 mr-4"
                              stroke={COLORS.GRAY[200]}
                            />
                            {label}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default BrcExtras;
