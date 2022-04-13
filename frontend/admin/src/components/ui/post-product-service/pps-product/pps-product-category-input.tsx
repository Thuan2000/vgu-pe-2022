import IndustryCategorySelect from "@components/ui/storybook/inputs/industry-category-input/industry-category-select";
import Input from "@components/ui/storybook/inputs/input";
import { IIndustry } from "@datas/industries";
import { ICategory } from "src/datas/categories";
import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IPostProductFormValues } from "./pps-product-interface";
import { CloseIcon } from "@assets/icons/close-icon";
import Button from "@components/ui/storybook/button";
import { useModal } from "src/contexts/modal.context";

interface IPPSProductCategoryInputProps {
  register: UseFormRegister<IPostProductFormValues>;
  errors: FieldErrors<IPostProductFormValues>;
  control: Control<IPostProductFormValues>;
  trigger: UseFormTrigger<IPostProductFormValues>;
}

const PPSProductCategoryInput: React.FC<IPPSProductCategoryInputProps> = ({
  register,
  errors,
  trigger,
  control,
}) => {
  const { t } = useTranslation("form");
  const { closeModal } = useModal();
  function handleCloseClick() {
    closeModal();
  }

  return (
    <>
      <div
        className="relative p-4 w-full h-full md:h-auto"
        style={{ width: 800 }}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-end px-2 pt-2">
            <button
              onClick={handleCloseClick}
              className="text-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-800 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:text-white"
            >
              <CloseIcon className="w-5 h-5"></CloseIcon>
            </button>
          </div>
          <div className="px-4 pb-4 space-y-6">
            <Input
              required
              {...register("category.name")}
              label={t("productName-input-label")}
              onChange={(e) => {
                register("category.name").onChange(e);
                trigger("category.name");
              }}
              placeholder={t("productName-input-placeholder")}
              error={t(errors.category?.name?.message || "")}
            />
            <IndustryCategorySelect
              optionTextSize="xs"
              required
              label={t("productIndustryCategory-label")}
              control={control}
              onIndustryChange={() => trigger("category.industry")}
              onCategoryChange={() => trigger("category.category")}
              industryControllerName="category.industry"
              getIndustryLabel={(e: IIndustry) => t("industry:" + e.label)}
              categoryControllerName="category.category"
              getCategoryLabel={(e: ICategory) => t("category:" + e.label)}
              error={t(
                (errors.category?.industry as any)?.message ||
                  (errors.category?.category as any)?.message
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default PPSProductCategoryInput;
