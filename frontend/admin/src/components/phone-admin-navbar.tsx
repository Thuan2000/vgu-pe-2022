import DownVIcon from "@assets/icons/down-v-icon";
import FilterIcon from "@assets/icons/filter-icon";
import MessageIcon from "@assets/icons/message-icon";
import SearchIcon from "@assets/icons/search-icon";
import { COLORS } from "@utils/colors";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { usePageName } from "src/contexts/page-name.context";
import Logo from "./ui/logo";

interface IPhoneAdminNavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const PhoneAdminNavbar: React.FC<IPhoneAdminNavbarProps> = ({
  className,
  ...props
}) => {
  const { pageName } = usePageName();

  const { pathname, ...router } = useRouter();
  const showBackArrow = !!pathname.split("/")[1];

  function handleBackClick() {
    router.back();
  }

  const { t } = useTranslation("common");
  return (
    <div className="bg-white w-full">
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
            <button onClick={handleBackClick}>
              <DownVIcon
                className="rotate-90 mr-4"
                fill={COLORS.PRIMARY.DEFAULT}
              />
            </button>
          )}
          <p className="text-lg font-semibold">{t(pageName)}</p>
        </div>
        <button>
          <FilterIcon />
        </button>
      </div>
    </div>
  );
};
export default PhoneAdminNavbar;
