import { IIndustry } from "@utils/industries";
import { ICategory } from "@utils/categories";
import React from "react";
import ICSListComponent from "./ICSListComponent";
import ICSListWrapper from "./ICSListWrapper";
import { Control, Controller } from "react-hook-form";

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
  getCategoryLabel: (e: ICategory) => string;
  getIndustryLabel: (e: IIndustry) => string;
  onIndustryChange?: (e: IIndustry) => void;
  onCategoryChange?: (e: ICategory) => void;
}

const ICSList: React.FC<IICSListProps> = ({
  industryControllerName,
  categoryControllerName,
  control,
  selectedIndustry,
  selectedCategory,
  industries,
  categories,
  onIndustryClick,
  onIndustryChange,
  onCategoryChange,
  onCategoryClick,
  getCategoryLabel,
  getIndustryLabel,
}) => {
  return (
    <div className="flex mt-3 border rounded-sm">
      <Controller
        control={control}
        name={industryControllerName}
        render={({ field: { onChange, value, ...field } }) => {
          return (
            <ICSListWrapper>
              {industries.map((industry) => {
                if (value === industry && !selectedIndustry)
                  onIndustryClick(value);
                const isActive = industry === selectedIndustry;
                return (
                  <ICSListComponent
                    key={industry.id + "ic-industry"}
                    isActive={isActive}
                    hasChildren
                    label={getIndustryLabel(industry)}
                    onClick={() => {
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
                    key={category.id + "ic-category"}
                    isActive={isActive}
                    label={getCategoryLabel(category)}
                    onClick={() => {
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
