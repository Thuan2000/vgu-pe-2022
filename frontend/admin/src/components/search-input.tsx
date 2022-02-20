import SearchIcon from "@assets/icons/search-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import Input from "./ui/storybook/inputs/input";

interface ISearchInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onChange?: (e: any) => void;
  withSearchIcon?: boolean;
  disabled?: boolean;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  onChange,
  className,
  disabled,
  withSearchIcon = true,
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
        className="w-full focus:none"
        onChange={onChange}
        disabled={disabled}
        placeholder={t("search-Placeholder")}
      />
      {withSearchIcon && (
        <button
          type="button"
          className="border-gray-200 p-3 flex-center border-l"
        >
          <SearchIcon fill={COLORS.GRAY[200]} />
        </button>
      )}
    </div>
  );
};
export default SearchInput;
