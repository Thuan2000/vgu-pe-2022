import React, { ChangeEvent, useEffect, useState, useRef } from "react";

import ArrowDownIcon from "@assets/icons/arrow-down-icon";
import Input from "./storybook/inputs/input";
import SearchIcon from "@assets/icons/search-icon";
import { useGetBrNameSuggestionMutation } from "@graphql/buying-request.graphql";
import { useRouter } from "next/dist/client/router";
import Form from "@components/form";
import { useTranslation } from "next-i18next";
import { INameSuggestion } from "@graphql/types.graphql";

const TYPING_TIMEOUT = 350;
const MAX_SUGGESTIONS = 7;

const Search = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [getSuggestion] = useGetBrNameSuggestionMutation();
  const [suggestions, setSuggestions] = useState<INameSuggestion[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isShowSuggestion, setIsShowSuggestion] = useState(false);
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
  const wrapperRef = useRef(null);
  const { t } = useTranslation();

  const { pathname, query, ...router } = useRouter();

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
          (await getSuggestion({ variables: { inputName: inputValue } })) || {};

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
  }, [wrapperRef]);

  /**
   *
   * @param input Search value
   */
  function redirectWithParam(input?: string) {
    router.replace({
      pathname,
      query: { ...query, name: input || inputValue },
    });
  }

  function searchInputValue(inputValue: string) {
    redirectWithParam(inputValue);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);

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
      setFocusedSuggestion((old) => Math.max(--old, -1));
      if (!isShowSuggestion) showSuggestion();
    }
  }

  function handleInputFocus() {
    if (inputValue) showSuggestion();
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={wrapperRef}
      className={`relative ${className}`}
      {...props}
    >
      <Form onSubmit={handleSearch}>
        <div className={`flex items-center rounded-md border border-green `}>
          <button
            style={{ height: "45px", width: "166px" }}
            type="button"
            onClick={hideSuggestion}
            className="flex-center border-r-2"
          >
            <p className="text-paragraph text-dark-blue">{t("Suppliers")}</p>
            <ArrowDownIcon className="ml-3" />
          </button>
          <div className="relative">
            <Input
              noBorder
              value={inputValue}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onChange={handleInputChange}
              className="border-none sm:w-[350px]"
            />
          </div>
          <button className="flex-center border-l-2 sm:w-[45px] sm:h-[45px] border-l-green rounded-sm">
            <SearchIcon />
          </button>
        </div>
        <div className="bg-white left-[166px] right-0 absolute border-r border-l border-primary rounded-b-lg overflow-hidden z-[9999]">
          {isShowSuggestion &&
            suggestions &&
            suggestions.slice(0, MAX_SUGGESTIONS).map((sug, idx) => {
              return (
                <p
                  onClick={() => handleSelectedInput(sug.name)}
                  className={`px-4 py-3 border-b border-primary z-[99999] cursor-pointer 
                    ${
                      focusedSuggestion === idx && "bg-gray-10 border-dark-blue"
                    }
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
