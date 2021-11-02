import React, { ChangeEvent, useEffect, useState } from "react";

import ArrowDownIcon from "@assets/icons/arrow-down-icon";
import Input from "./storybook/inputs/input";
import SearchIcon from "@assets/icons/search-icon";
import { useGetBrNameSuggestionMutation } from "@graphql/buying-request.graphql";
import { useRouter } from "next/dist/client/router";
import Form from "@components/form";
import { useTranslation } from "next-i18next";
import { INameSuggestion } from "@graphql/types.graphql";

const TYPING_TIMEOUT = 350;

const Search = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [getSuggestion, { loading }] = useGetBrNameSuggestionMutation();
  const [suggestions, setSuggestions] = useState<INameSuggestion[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const { t } = useTranslation();

  const { pathname, query, ...router } = useRouter();

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

    if (!e.target.value) setShowSuggestion(false);
    else setShowSuggestion(true);
  }

  function handleInputClick(sug: string) {
    searchInputValue(sug.toLowerCase());
    setInputValue(sug);
    setShowSuggestion(false);
  }

  function handleSearch() {
    redirectWithParam();
    setShowSuggestion(false);
  }

  return (
    <div className={`relative ${className}`} {...props}>
      <Form onSubmit={handleSearch}>
        <div className={`flex items-center rounded-md border border-green `}>
          <button
            style={{ height: "45px", width: "166px" }}
            type="button"
            className="flex-center border-r-2"
          >
            <p className="text-paragraph text-dark-blue">{t("Suppliers")}</p>
            <ArrowDownIcon className="ml-3" />
          </button>
          <div className="relative">
            <Input
              noBorder
              value={inputValue}
              // onBlur={() => setShowSuggestion(false)}
              onChange={handleInputChange}
              className="border-none sm:w-[300px]"
            />
          </div>
          <button className="flex-center border-l-2 sm:w-[45px] sm:h-[45px] border-l-green rounded-sm">
            <SearchIcon />
          </button>
        </div>
        <div className="bg-white absolute w-full border-l border-r rounded-b-lg overflow-hidden z-[9999]">
          {showSuggestion &&
            suggestions.map((sug) => {
              return (
                <p
                  onClick={() => handleInputClick(sug.name)}
                  className="py-1 p-1 border-b z-[99999]"
                  key={sug + "suggestion-key"}
                  dangerouslySetInnerHTML={{
                    __html: sug.highlightedName,
                  }}
                >
                  {}
                </p>
              );
            })}
        </div>
      </Form>
    </div>
  );
};
export default Search;
