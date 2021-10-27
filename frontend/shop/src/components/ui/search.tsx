import React, { ChangeEvent, useEffect, useState } from "react";

import ArrowDownIcon from "@assets/icons/arrow-down-icon";
import Input from "./storybook/inputs/input";
import SearchIcon from "@assets/icons/search-icon";
import { useGetBrNameSuggestionMutation } from "@graphql/buying-request.graphql";
import { useRouter } from "next/dist/client/router";

const TYPING_TIMEOUT = 350;

function getBoldedString(suggestion: string, input: string) {
  console.log(suggestion);
  const splittedSuggestion = suggestion.split("");
  const splittedInput = new Set(input.split(""));
  const highlighted = new Set();

  return (
    <>
      {splittedSuggestion.map((letter, idx) => {
        const isMatch = splittedInput.has(letter) && !highlighted.has(letter);

        if (isMatch) highlighted.add(letter);

        return (
          <span className={`${isMatch && "font-semibold"}`} key={letter + idx}>
            {letter}
          </span>
        );
      })}
    </>
  );
}

const Search = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [getSuggestion, { loading }] = useGetBrNameSuggestionMutation();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const { pathname, query, ...router } = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function getSuggestions() {
      if (timeout) clearTimeout(timeout);
      if (!inputValue) return;

      timeout = setTimeout(async () => {
        const { data } =
          (await getSuggestion({ variables: { inputName: inputValue } })) || {};

        setSuggestions(data?.getSuggestion || []);
      }, TYPING_TIMEOUT);
    }

    getSuggestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  function searchInputValue(inputValue: string) {
    router.replace({
      pathname,
      query: { ...query, name: inputValue },
    });
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setShowSuggestion(true);
  }

  function handleInputClick(sug: string) {
    searchInputValue(sug.toLowerCase());
    setInputValue(sug);
    setShowSuggestion(false);
  }

  return (
    <div className={`relative ${className}`} {...props}>
      <div className={`flex items-center rounded-md border border-green `}>
        <button
          style={{ height: "45px", width: "166px" }}
          className="flex-center border-r-2"
        >
          <p className="text-paragraph text-dark-blue">Suppliers</p>
          <ArrowDownIcon className="ml-3" />
        </button>
        <div className="relative">
          <Input
            noBorder
            value={inputValue}
            onChange={handleInputChange}
            className="border-none sm:w-[300px]"
          />
        </div>
        <button className="flex-center border-l-2 sm:w-[45px] sm:h-[45px] border-l-green rounded-sm">
          <SearchIcon />
        </button>
      </div>
      <div className="bg-white absolute w-full border-l border-r rounded-b-lg overflow-hidden">
        {showSuggestion &&
          suggestions.map((sug) => {
            return (
              <p
                onClick={() => handleInputClick(sug)}
                className="py-1 p-1 border-b z-[99999]"
                key={sug + "suggestion-key"}
              >
                {getBoldedString(sug, sug)}
              </p>
            );
          })}
      </div>
    </div>
  );
};
export default Search;
