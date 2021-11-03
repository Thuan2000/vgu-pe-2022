import SearchIcon from "@assets/icons/search-icon";
import { COLORS } from "@utils/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./storybook/button";
import Input from "./storybook/inputs/input";

interface ISearchInputProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  className,
  placeholder,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex items-center w-full border rounded-md overflow-hidden ${className}`}
      {...props}
    >
      {/* @TODO make this searchable */}
      <Input
        noBorder
        className="!h-8 w-full focus:none"
        placeholder={placeholder}
      />
      <Button
        variant="custom"
        type="button"
        className="border-gray-200 p-3 flex-center border-l rounded-none !h-8"
      >
        <SearchIcon fill={COLORS.GRAY[200]} />
      </Button>
    </div>
  );
};
export default SearchInput;
