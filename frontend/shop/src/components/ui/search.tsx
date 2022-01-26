import React, { ChangeEvent, useEffect, useState } from "react";

import Input from "./storybook/inputs/input";
import SearchIcon from "@assets/icons/search-icon";
import { useGetBrNameSuggestionMutation } from "@graphql/buying-request.graphql";
import { useRouter } from "next/dist/client/router";
import Form from "@components/form";
import { useTranslation } from "next-i18next";
import { INameSuggestion } from "@graphql/types.graphql";
import XIcon from "@assets/icons/x-icon";
import Button from "./storybook/button";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import SearchTypeSelector from "./search-type-selector";
import { useGetCompanyNameSuggestionMutation } from "@graphql/company.graphql";
import { useServiceNameSuggestionMutation } from "@graphql/service.graphql";
import { getActivePageFromPath } from "@utils/functions";
import { useProductNameSuggestionMutation } from "@graphql/product.graphql";

const TYPING_TIMEOUT = 350;
const MAX_SUGGESTIONS = 5;

let timeout: NodeJS.Timeout;

export type TPageName =
  | "nha-cung-cap"
  | "dich-vu"
  | "nhu-cau-thu-mua"
  | "san-pham";

const Search = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation("form");

  const [getBrsSuggestion] = useGetBrNameSuggestionMutation();
  const [getCompaniesSuggestion] = useGetCompanyNameSuggestionMutation();
  const [getServicesSuggestion] = useServiceNameSuggestionMutation();
  const [getProductsSuggestion] = useProductNameSuggestionMutation();
  const suggestionFunctions: any = {
    ["nha-cung-cap"]: getCompaniesSuggestion,
    ["dich-vu"]: getServicesSuggestion,
    ["nhu-cau-thu-mua"]: getBrsSuggestion,
    ["san-pham"]: getProductsSuggestion,
  };

  const [suggestions, setSuggestions] = useState<INameSuggestion[]>([]);
  const [isShowSuggestion, setIsShowSuggestion] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const outsideClickRef = useOutsideClickRef(hideSuggestion);
  const { pathname, query, ...router } = useRouter();
  const activePage: TPageName = getActivePageFromPath(pathname) as any;

  const [inputValue, setInputValue] = useState<string>(
    (query?.name as string) || ""
  );

  useEffect(() => {
    setInputValue("");
    setSuggestions([]);
  }, [activePage]);

  useEffect(() => {
    setInputValue((query?.name as string) || "");
  }, [query?.name]);

  function getSuggestionVariables() {
    return {
      variables: {
        name: inputValue,
        limit: MAX_SUGGESTIONS,
      },
    };
  }

  async function getSuggestions() {
    setSuggestions([]);
    if (!suggestionFunctions[activePage]) return;
    const { data } =
      (await suggestionFunctions[activePage](getSuggestionVariables())) || {};

    const key = Object.keys(data)[0];
    setSuggestions((data?.[key] as any) || []);
  }

  /**
   * Handling suggestions fetch
   */
  useEffect(() => {
    function getNameSuggestions() {
      if (timeout) clearTimeout(timeout);
      if (!inputValue) return;

      timeout = setTimeout(getSuggestions, TYPING_TIMEOUT);
    }

    getNameSuggestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  function hideSuggestion() {
    setIsShowSuggestion(false);
  }
  function showSuggestion() {
    setIsShowSuggestion(true);
  }

  /**
   *
   * @param input Search value
   */
  function redirectWithParam(input?: string, isClearing?: boolean) {
    const isSearching = !!(input || inputValue);
    if (!isSearching || isClearing) delete query.name;

    router.replace({
      pathname,
      query: {
        ...query,
        ...(isSearching && !isClearing ? { name: input || inputValue } : {}),
      },
    });
  }

  function searchInputValue(inputValue: string) {
    redirectWithParam(inputValue);
  }

  function clearSearch() {
    setInputValue("");
    redirectWithParam("", true);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setFocusedSuggestion(-1);

    if (!e.target.value) hideSuggestion();
    else if (!isShowSuggestion) showSuggestion();
  }

  function handleSelectedInput(sug: string) {
    searchInputValue(sug.toLowerCase());
    setInputValue(sug);
    hideSuggestion();
  }

  /**
   * When submitting
   */
  function handleSearch() {
    setFocusedSuggestion(-1);
    redirectWithParam();
    hideSuggestion();
  }

  /**
   *
   * @param e All arrow key, enter and such
   */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Hide suggestions
    if (e.key === "Escape") hideSuggestion();

    // Selected suggestion
    if (e.key === "Enter" && focusedSuggestion !== -1)
      handleSelectedInput(suggestions[focusedSuggestion].name);

    // Selecting suggestion
    if (e.key === "ArrowDown") {
      setFocusedSuggestion((old) => (old + 1) % MAX_SUGGESTIONS);
      if (!isShowSuggestion) showSuggestion();
    }

    // Selecting suggestion
    if (e.key === "ArrowUp") {
      setFocusedSuggestion(
        (old) => (old - 1 + MAX_SUGGESTIONS) % MAX_SUGGESTIONS
      );
      if (!isShowSuggestion) showSuggestion();
    }
  }

  function handleInputFocus() {
    if (inputValue) showSuggestion();
  }

  return (
    <div ref={outsideClickRef} className={`relative`} {...props}>
      <Form onSubmit={handleSearch}>
        <div className={`flex items-center rounded-md border border-green `}>
          <SearchTypeSelector />
          <div className="relative">
            <div>
              <Input
                noBorder
                value={inputValue}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                inputClassName="border-none sm:w-[350px]"
                placeholder={t(`search-${activePage}-input-placeholder`)}
              />

              {inputValue && (
                <XIcon
                  className="absolute right-5 top-1/2 -translate-y-1/2 w-3 h-3 cursor-pointer"
                  onClick={clearSearch}
                />
              )}
            </div>
            <div className="bg-white top-full mt-[1px] left-[-1px] right-[-1px] absolute border-r border-l border-primary rounded-b-lg overflow-hidden z-[9999]">
              {isShowSuggestion &&
                suggestions &&
                suggestions.slice(0, MAX_SUGGESTIONS).map((sug, idx) => {
                  return (
                    <p
                      onClick={() => handleSelectedInput(sug.name)}
                      className={`px-4 py-3 border-b border-primary z-[99999] cursor-pointer 
                    ${focusedSuggestion === idx && "bg-gray-10"}
                  `}
                      key={sug.highlightedName + "suggestion-key" + idx}
                      dangerouslySetInnerHTML={{
                        __html: sug.highlightedName,
                      }}
                    />
                  );
                })}
            </div>
          </div>
          <Button
            type="button"
            variant="custom"
            onClick={handleSearch}
            className="flex-center px-2 border-l border-primary rounded-none"
          >
            <SearchIcon className={`w-4 h-4`} />
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Search;
