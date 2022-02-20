import SearchInput from "@components/search-input";
import { IIndustry } from "@datas/industries";
import { ICategory } from "src/datas/categories";
import React, { useState } from "react";
import ICSListComponent from "./ICSListComponent";
import ICSListWrapper from "./ICSListWrapper";
import { Control, Controller } from "react-hook-form";
import { FontSize } from "@utils/interfaces";
import { useTranslation } from "next-i18next";
import { normalizeString } from "@utils/functions";

export interface IICSListProps {
  industryControllerName: string;
  categoryControllerName: string;
  control: Control<any>;
  selectedIndustry?: IIndustry;
  selectedCategory?: ICategory;
  onIndustryClick: (industry: IIndustry) => void;
  onCategoryClick: (category: ICategory) => void;
  industries: IIndustry[];
  categories: ICategory[];
  optionTextSize: FontSize;
  disabled?: boolean;
  getCategoryLabel: (e: ICategory) => string;
  getIndustryLabel: (e: IIndustry) => string;
  onIndustryChange?: (e: IIndustry) => void;
  onCategoryChange?: (e: ICategory) => void;
}

const ICSList: React.FC<IICSListProps> = ({
  industryControllerName,
  categoryControllerName,
  control,
  disabled,
  selectedIndustry,
  selectedCategory,
  industries,
  categories,
  optionTextSize,
  onIndustryClick,
  onIndustryChange,
  onCategoryChange,
  onCategoryClick,
  getCategoryLabel,
  getIndustryLabel,
}) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>("");

  function isMatchIndustry(ind: IIndustry) {
    return normalizeString(t("industry:" + ind.label).toLowerCase()).includes(
      normalizeString(searchValue?.toLowerCase())
    );
  }

  function filteredIndustries() {
    return industries.filter((ind) => {
      return isMatchIndustry(ind);
    });
  }

  return (
    <div className="flex mt-3 border rounded-sm">
      <Controller
        control={control}
        name={industryControllerName}
        render={({ field: { onChange, value, ...field } }) => {
          return (
            <ICSListWrapper className={`!p-0 border-r`}>
              <SearchInput
                withSearchIcon={false}
                disabled={disabled}
                className="sm:w-full rounded-none border-r-0 border-l-0 border-t-0"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {filteredIndustries().map((industry) => {
                if (value === industry && !selectedIndustry)
                  onIndustryClick(value);
                const isActive = industry === selectedIndustry;
                return (
                  <ICSListComponent
                    textSize={optionTextSize || "sm"}
                    key={industry.id + "ic-industry"}
                    isActive={isActive}
                    hasChildren
                    label={getIndustryLabel(industry)}
                    onClick={() => {
                      if (disabled) return;
                      onChange(industry);
                      if (onIndustryChange) onIndustryChange(industry);
                      onIndustryClick(industry);
                    }}
                    {...field}
                  />
                );
              })}
            </ICSListWrapper>
          );
        }}
      />

      <Controller
        control={control}
        name={categoryControllerName}
        render={({ field: { onChange, value, ...field } }) => {
          return (
            <ICSListWrapper>
              {categories.map((category) => {
                if (
                  (value as ICategory)?.id === category.id &&
                  !selectedCategory
                ) {
                  onCategoryClick(value);
                }
                const isActive = category === selectedCategory;
                return (
                  <ICSListComponent
                    textSize={optionTextSize || "sm"}
                    key={category.id + "ic-category"}
                    isActive={isActive}
                    label={getCategoryLabel(category)}
                    onClick={() => {
                      if (disabled) return;
                      onChange(category);
                      if (onCategoryChange) onCategoryChange(category);
                      onCategoryClick(category);
                    }}
                    {...field}
                  />
                );
              })}
            </ICSListWrapper>
          );
        }}
      />
    </div>
  );
};
export default ICSList;
