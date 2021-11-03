import React, { ChangeEvent, useEffect, useState, useRef } from "react";

import ArrowDownIcon from "@assets/icons/arrow-down-icon";
import Input from "./storybook/inputs/input";
import SearchIcon from "@assets/icons/search-icon";
import { useGetBrNameSuggestionMutation } from "@graphql/buying-request.graphql";
import { useRouter } from "next/dist/client/router";
import Form from "@components/form";
import { useTranslation } from "next-i18next";
import { INameSuggestion } from "@graphql/types.graphql";
import XIcon from "@assets/icons/x-icon";
import Button from "./storybook/button";

const TYPING_TIMEOUT = 350;
const MAX_SUGGESTIONS = 5;

const Search = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [getSuggestion] = useGetBrNameSuggestionMutation();
  const [suggestions, setSuggestions] = useState<INameSuggestion[]>([]);
  const [isShowSuggestion, setIsShowSuggestion] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const { t } = useTranslation();

  const { pathname, query, ...router } = useRouter();

  const [inputValue, setInputValue] = useState<string>(
    (query?.name as string) || ""
  );
  /**
   * Handling suggestions fetch
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function getSuggestions() {
      if (timeout) clearTimeout(timeout);
      if (!inputValue) return;

      timeout = setTimeout(async () => {
        const { data } =
          (await getSuggestion({
            variables: {
              inputName: inputValue,
              limit: MAX_SUGGESTIONS,
            },
          })) || {};

        setSuggestions((data?.getSuggestion as any) || []);
      }, TYPING_TIMEOUT);
    }

    getSuggestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  function hideSuggestion() {
    setIsShowSuggestion(false);
  }
  function showSuggestion() {
    setIsShowSuggestion(true);
  }

  /**
   * When input search unfocused
   */
  useEffect(() => {
    document.addEventListener("click", hideSuggestion);
    return () => document.removeEventListener("click", hideSuggestion);
  }, []);

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
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative ${className}`}
      {...props}
    >
      <Form onSubmit={handleSearch}>
        <div className={`flex items-center rounded-md border border-green `}>
          <Button
            type="button"
            variant="custom"
            onClick={hideSuggestion}
            className="!h-9 flex-center rounded-none border-r border-primary w-[125px]"
          >
            <p className="text-paragraph text-dark-blue">{t("Suppliers")}</p>
            <ArrowDownIcon className="ml-3" />
          </Button>
          <div className="relative ">
            <Input
              noBorder
              value={inputValue}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onChange={handleInputChange}
              inputClassName="border-none sm:w-[350px] !h-9"
            />

            {inputValue && (
              <XIcon
                className="absolute right-5 top-1/2 -translate-y-1/2 w-3 h-3 cursor-pointer"
                onClick={clearSearch}
              />
            )}
          </div>
          <Button
            type="button"
            variant="custom"
            onClick={handleSearch}
            className="!h-9 flex-center px-2 border-l border-primary rounded-none"
          >
            <SearchIcon />
          </Button>
        </div>
        <div className="bg-white left-[125px] right-0 absolute border-r border-l border-primary rounded-b-lg overflow-hidden z-[9999]">
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
      </Form>
    </div>
  );
};
export default Search;
