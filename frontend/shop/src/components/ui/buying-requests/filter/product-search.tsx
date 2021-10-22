import { useTranslation } from "next-i18next";
import React from "react";
import SearchInput from "../../search-input";
import Typography from "@storybook/typography";

interface IProductSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProductSearch: React.FC<IProductSearchProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      <Typography
        text={t("product-filter-label")}
        variant="smallTitle"
        className="mb-4"
      />
      <SearchInput />
    </div>
  );
};
export default ProductSearch;
