import ArrowDownIcon from "@assets/icons/arrow-down-icon";
import { PAGE_NAME_INTO_LABEL } from "@utils/constants";

import { getActivePageFromPath } from "@utils/functions";
import { Page } from "@utils/interfaces";

import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import Button from "./storybook/button";

const types: Page[] = [
  "nhu-cau-thu-mua",
  "danh-ba-cong-ty",
  "san-pham-dich-vu",
  // "ho-tro",
];

interface ISearchTypeSelectorProps {}

const SearchTypeSelector: React.FC<ISearchTypeSelectorProps> = ({}) => {
  const { t } = useTranslation();
  const { pathname, ...router } = useRouter();
  const activePage = getActivePageFromPath(pathname);

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

  function handleTypeClick(type: Page) {
    router.replace(type);
    hideTypeSelector();
  }

  return (
    <div ref={outsideClickRef} className="relative select-none">
      <Button
        type="button"
        variant="custom"
        onClick={toggleTypeSelector}
        className="!h-7 flex-center rounded-none border-r border-primary"
      >
        <p className="text-paragraph sm:min-w-[115px] text-dark-blue">
          {t((PAGE_NAME_INTO_LABEL as any)[activePage])}
        </p>
        <ArrowDownIcon className="ml-3" />
      </Button>

      {isSelectingType && (
        <div className="absolute w-full bg-white top-full border rounded-sm border-primary">
          {types.map((type, idx) => {
            if (type === activePage) return;
            return (
              <div
                key={type + "search-type-selector"}
                onClick={() => handleTypeClick(type)}
                className={`p-2 border-b cursor-pointer border-primary ${
                  idx === types.length - 1 && "border-b-0"
                }`}
              >
                {t(PAGE_NAME_INTO_LABEL[type])}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default SearchTypeSelector;
