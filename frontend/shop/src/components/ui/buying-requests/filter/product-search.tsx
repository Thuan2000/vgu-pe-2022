import { useTranslation } from "next-i18next";
import React from "react";
import SearchInput from "../../search-input";
import FilterLabel from "./filter-label";

interface IProductSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProductSearch: React.FC<IProductSearchProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <FilterLabel text={t("productName-filter-label")} />
      <SearchInput placeholder={t("productName-filter-placeholder")} />
    </div>
  );
};
export default ProductSearch;
