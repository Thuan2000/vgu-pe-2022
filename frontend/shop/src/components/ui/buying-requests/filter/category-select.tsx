import React, { useState, useEffect } from "react";

import { useTranslation } from "next-i18next";
import Select from "@components/ui/storybook/inputs/select";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";
import {
  getCategories,
  getIndustryCategories,
  ICategory,
} from "@datas/categories";
import { getIndustry, getIndustryBySlug } from "@datas/industries";

interface ICategorySelectProps extends React.HTMLAttributes<HTMLDivElement> {}

const CategorySelect: React.FC<ICategorySelectProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation();

  const { query, ...router } = useRouter();
  const industrySlug = query.industry as string;

  const industryId = getIndustryBySlug(industrySlug)?.id;
  const categoryFilter = query.category as string;
  const [value, setValue] = useState<ICategory | string>(categoryFilter);

  useEffect(() => {
    function setQuery() {
      if (typeof value === "string") return;
      if (!value) delete query.category;

      const { pathname } = router;

      router.push({
        pathname,
        query: {
          ...query,
          ...(value ? { category: (value as ICategory)?.slug } : {}),
        },
      });
    }

    setQuery();
  }, [value]);

  function handleChange(e: ICategory | unknown) {
    setValue(e as ICategory);
  }

  return (
    <div {...props}>
      <FilterLabel text={t("category-filter-label")} />
      <Select
        options={getIndustryCategories(industryId as number) || []}
        name="categoryFilter"
        isClearable
        value={value}
        getInitialValue={(opt: ICategory) => opt.slug === categoryFilter}
        placeholder={t("categoryFilter-placeholder")}
        onChange={handleChange}
        getOptionValue={((option: ICategory) => option?.slug) as any}
        getOptionLabel={
          ((option: ICategory) => t("category:" + option?.label)) as any
        }
      />
    </div>
  );
};
export default CategorySelect;
