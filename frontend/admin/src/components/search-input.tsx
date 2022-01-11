import SearchIcon from "@assets/icons/search-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import Input from "./ui/storybook/inputs/input";

interface ISearchInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onChange?: (e: any) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  onChange,
  className,
  ...props
}) => {
  const { t } = useTranslation("form");
  return (
    <div
      className={`flex items-center w-full border rounded-md overflow-hidden ${className}`}
      {...props}
    >
      <Input
        noBorder
        className="h-10 w-full focus:none"
        onChange={onChange}
        placeholder={t("search-Placeholder")}
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
