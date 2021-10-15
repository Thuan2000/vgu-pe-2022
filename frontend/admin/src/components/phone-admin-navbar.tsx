import DownVIcon from "@assets/icons/down-v-icon";
import FilterIcon from "@assets/icons/filter-icon";
import MessageIcon from "@assets/icons/message-icon";
import SearchIcon from "@assets/icons/search-icon";
import { COLORS } from "@utils/colors";
import React from "react";
import Logo from "./ui/logo";

interface IPhoneAdminNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  onBackClick: () => void;
  showBackArrow: boolean;
  pageName: string;
}

const PhoneAdminNavbar: React.FC<IPhoneAdminNavbarProps> = ({
  onBackClick,
  showBackArrow,
  pageName,
  ...props
}) => {
  return (
    <div {...props}>
      <div className="bg-white w-full z-30 relative">
        <div className="flex justify-between bg-white px-4 py-3">
          <Logo size="medium" />
          <div className="flex items-center">
            <MessageIcon className="mr-3" />
            <button className="p-2 border rounded-sm">
              <SearchIcon fill={COLORS.GRAY[200]} />
            </button>
          </div>
        </div>
        <div className="bg-primary flex items-center justify-between bg-opacity-20 px-5 py-4">
          <div className="flex items-center">
            {showBackArrow && (
              <button onClick={onBackClick}>
                <DownVIcon
                  className="rotate-90 mr-4"
                  fill={COLORS.PRIMARY.DEFAULT}
                />
              </button>
            )}
            <p className="text-lg font-semibold">{pageName}</p>
          </div>
          <button>
            <FilterIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
export default PhoneAdminNavbar;
