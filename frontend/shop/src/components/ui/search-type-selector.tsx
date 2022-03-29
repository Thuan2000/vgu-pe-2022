import ArrowDownIcon from "@assets/icons/arrow-down-icon";
import { PAGE_NAME_INTO_LABEL } from "@utils/constants";

import { getActivePageFromPath } from "@utils/functions";
import { PageName } from "@utils/interfaces";
import { ROUTES } from "@utils/routes";

import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import Button from "./storybook/button";
import Typography from "./storybook/typography";

const types: PageName[] = [
  ROUTES.TENDERS as PageName,
  ROUTES.COMPANIES as PageName,
  ROUTES.PRODUCTS as PageName,
  ROUTES.SERVICES as PageName,
];

interface ISearchTypeSelectorProps {
  height: number;
}

const SearchTypeSelector: React.FC<ISearchTypeSelectorProps> = ({ height }) => {
  const { t } = useTranslation("common");
  const { pathname, ...router } = useRouter();
  const activePage = `/${getActivePageFromPath(pathname)}`;

  const [isSelectingType, setIsSelectingType] = useState(false);

  const outsideClickRef = useOutsideClickRef(hideTypeSelector);

  function hideTypeSelector() {
    setIsSelectingType(false);
  }
  function showTypeSelector() {
    setIsSelectingType(true);
  }
  function toggleTypeSelector() {
    isSelectingType ? hideTypeSelector() : showTypeSelector();
  }

  function handleTypeClick(type: PageName) {
    router.replace(type);
    hideTypeSelector();
  }

  return (
    <div ref={outsideClickRef} className="relative select-none">
      <Button
        type="button"
        variant="custom"
        onClick={toggleTypeSelector}
        className={`flex-center rounded-none focus:!ring-0 focus:!shadow-none border-r border-primary !h-${height}`}
      >
        <p className="text-xs sm:min-w-[70px] sm:w-fit-content text-dark-blue">
          {t((PAGE_NAME_INTO_LABEL as any)[activePage])}
        </p>
        <ArrowDownIcon className="ml-3 w-3 h-3" />
      </Button>

      {isSelectingType && (
        <div className="absolute w-full bg-white top-full mt-[1px] border rounded-b-sm border-primary">
          {types.map((type, idx) => {
            if (type === activePage) return;
            return (
              <Typography
                className={`p-2 border-b cursor-pointer border-primary ${
                  idx === types.length - 1 && "border-b-0"
                }`}
                size="xs"
                onClick={() => handleTypeClick(type)}
                key={type + "search-type-selector"}
                text={t(PAGE_NAME_INTO_LABEL[type as any])}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default SearchTypeSelector;
