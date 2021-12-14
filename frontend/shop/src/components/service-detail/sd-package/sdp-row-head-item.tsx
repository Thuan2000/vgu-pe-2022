import HelpIcon from "@assets/icons/navigations/help-icon";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import SDPTableItemWrapper from "./sdp-item-wrapper";

interface ISDPRowHeadItemProps {
  row: any;
}

const SDPRowHeadItem: React.FC<ISDPRowHeadItemProps> = ({ row }) => {
  const { t } = useTranslation();
  const [isShowingTooltip, setIsShowingTooltip] = useState(false);

  function showTooltip() {
    setIsShowingTooltip(true);
  }

  function hideTooltip() {
    setIsShowingTooltip(false);
  }

  return (
    <SDPTableItemWrapper isHead className="border-b cursor-pointer select-none">
      <div className="fic">
        <Typography text={t(row?.name)} />
        {row?.description && (
          <div className="relative">
            <HelpIcon
              className="ml-2 w-4 h-4"
              onMouseLeave={hideTooltip}
              onMouseEnter={showTooltip}
            />
            {isShowingTooltip && (
              <div className="absolute bg-dark-blue opacity-90 p-2 text-left bottom-full text-white z-50 animate-fadeIn triangle-pointer rounded -translate-y-3 -translate-x-1">
                {t(row.description)}
              </div>
            )}
          </div>
        )}
      </div>
    </SDPTableItemWrapper>
  );
};
export default SDPRowHeadItem;
