import SearchIcon from "@assets/icons/search-icon";
import { COLORS } from "@utils/colors";
import React from "react";
import Input from "./ui/storybook/inputs/input";

interface ISearchInputProps extends React.HTMLAttributes<HTMLDivElement> {}

const SearchInput: React.FC<ISearchInputProps> = ({ className, ...props }) => {
  return (
    <div
      className={`flex items-center w-full border rounded-md overflow-hidden ${className}`}
      {...props}
    >
      {/* @TODO make this searchable */}
      <Input
        noBorder
        className="h-9 w-full focus:none"
        placeholder="Tìm kiếm"
      />
      <button
        type="button"
        className="border-gray-200 p-3 flex-center border-l"
      >
        <SearchIcon fill={COLORS.GRAY[200]} />
      </button>
    </div>
  );
};
export default SearchInput;
