import IndustryCategorySelect from "@components/ui/storybook/inputs/industry-category-input/industry-category-select";
import Input from "@components/ui/storybook/inputs/input";
import { IIndustry } from "@datas/industries";
import { ICategory } from "src/datas/categories";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IPostProductFormValues } from "./pps-product-interface";
import Button from "@components/ui/storybook/button";

interface IPPSProductCategoryInputProps {
  onSelect: () => void;
}

const PPSProductCategoryInput: React.FC<IPPSProductCategoryInputProps> = ({
  onSelect,
}) => {
  const { t } = useTranslation("form");
  const [error, setError] = useState("");
  const {
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useFormContext<IPostProductFormValues>();

  const selectedInd = getValues("general.industry");
  const selectedCategory = getValues("general.industry");

  useEffect(() => {
    if (!!selectedInd && !!selectedCategory) setError("");
  }, [selectedInd, selectedCategory]);

  function handleSelect() {
    if (!getValues("general.industry") || !getValues("general.category")) {
      setError(t("please-select-ic"));
      return;
    }

    onSelect();
  }

  function getErrorMessage() {
    return (
      error ||
      t(
        (errors.general?.industry as any)?.message ||
          (errors.general?.category as any)?.message
      )
    );
  }

  return (
    <>
      <div
        className="relative p-4 w-full h-full md:h-auto"
        style={{ width: 800 }}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-4 space-y-2">
            <IndustryCategorySelect
              optionTextSize="xs"
              required
              label={t("productIndustryCategory-label")}
              control={control}
              onIndustryChange={() => {
                trigger("general.industry");
              }}
              industryControllerName="general.industry"
              getIndustryLabel={(e: IIndustry) => t("industry:" + e.label)}
              categoryControllerName="general.category"
              onCategoryChange={() => trigger("general.category")}
              getCategoryLabel={(e: ICategory) => t("category:" + e.label)}
              error={getErrorMessage()}
            />
          </div>
          <p className={`text-right w-full pb-4 pr-4`}>
            <Button onClick={handleSelect} className={`text-right`}>
              {t("select")}
            </Button>
          </p>
        </div>
      </div>
    </>
  );
};
export default PPSProductCategoryInput;
