import React from "react";

import Button from "./storybook/button";
import ArrowDownIcon from "@assets/icons/arrow-down-icon";
import Input from "./storybook/inputs/input";
import SearchIcon from "@assets/icons/search-icon";

const Search = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex items-center rounded-md border border-green ${className}`}
      {...props}
    >
      <button
        style={{ height: "45px", width: "166px" }}
        className="flex-center border-r-2"
      >
        <p className="text-paragraph text-dark-blue">Suppliers</p>
        <ArrowDownIcon className="ml-3" />
      </button>
      <Input
        noLabel
        noBorder
        style={{ height: "45px", width: "300px" }}
        className="border-none"
      />
      <button
        style={{ height: "45px", width: "45px" }}
        className="flex-center border-l-2 border-l-green rounded-sm"
      >
        <SearchIcon />
      </button>
    </div>
  );
};
export default Search;
