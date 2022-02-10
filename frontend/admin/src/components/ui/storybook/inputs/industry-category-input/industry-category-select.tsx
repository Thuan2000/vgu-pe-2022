import { getIndustryCategories, ICategory } from "src/datas/categories";
import { IIndustry, industriesData } from "@datas/industries";
import React, { useState } from "react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Typography from "../../typography";
import ValidationError from "../../validation-error";
import InputLabel, { IInputLabelProps } from "../input-label";
import ICSList from "./ICSList";
import { FontSize } from "@utils/interfaces";

interface IIndustryCategorySelectProps extends IInputLabelProps {
  control: Control<any>;
  industryControllerName: string;
  categoryControllerName: string;
  error?: string;
  optionTextSize?: FontSize;
  getCategoryLabel: (e: ICategory) => string;
  getIndustryLabel: (e: IIndustry) => string;
  onIndustryChange?: (e: IIndustry) => void;
  onCategoryChange?: (e: ICategory) => void;
}

const IndustryCategorySelect: React.FC<IIndustryCategorySelectProps> = ({
  numberQueue,
  onIndustryChange,
  onCategoryChange,
  name,
  note,
  queueBackground,
  label,
  required,
  optionTextSize = "xs",
  error,
  getCategoryLabel,
  getIndustryLabel,
  control,
  industryControllerName,
  categoryControllerName,
}) => {
  const { t } = useTranslation("form");

  const [selectedIndustry, setSelectedIndustry] = useState<IIndustry>();
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const categories = getIndustryCategories(selectedIndustry?.id || -1);

  function handleIndustryChange(industry: IIndustry) {
    if (selectedIndustry === industry) return;

    setSelectedCategory(undefined);
    setSelectedIndustry(industry);
  }

  function handleCategoryChange(category: ICategory) {
    if (selectedIndustry === category) return;

    setSelectedCategory(category);
  }

  return (
    <>
      {label && (
        <InputLabel
          required={required}
          numberQueue={numberQueue}
          name={name}
          note={note}
          queueBackground={queueBackground}
          label={label}
        />
      )}
      <div className={`${!!numberQueue && "ml-8"}`}>
        <div className="border p-4">
          <ICSList
            control={control}
            optionTextSize={optionTextSize}
            industryControllerName={industryControllerName}
            categoryControllerName={categoryControllerName}
            onIndustryChange={onIndustryChange}
            onCategoryChange={onCategoryChange}
            categories={categories}
            industries={industriesData}
            selectedCategory={selectedCategory}
            selectedIndustry={selectedIndustry}
            onIndustryClick={handleIndustryChange}
            getCategoryLabel={getCategoryLabel}
            getIndustryLabel={getIndustryLabel}
            onCategoryClick={handleCategoryChange}
          />
          {selectedIndustry && (
            <div className="flex items-center px-3 mt-2">
              <Typography
                variant="smallTitle"
                text={`${t("recentlySelected-label")}:`}
              />
              <Typography
                variant="smallTitle"
                color="primary"
                className="px-2"
                text={t("industry:" + selectedIndustry?.label)}
              />
              {selectedCategory && (
                <>
                  <Typography variant="smallTitle" text=">" color="primary" />
                  <Typography
                    variant="smallTitle"
                    color="primary"
                    className="px-2"
                    text={t("category:" + selectedCategory?.label)}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <ValidationError message={error} />
      </div>
    </>
  );
};
export default IndustryCategorySelect;
