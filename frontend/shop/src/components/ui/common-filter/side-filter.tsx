import FilterIcon from "@assets/icons/filter-icon";
import Typography from "@components/ui/storybook/typography";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import BudgetRange from "./budget-range";
import CategorySelect from "./category-select";
import IndustrySelect from "./industry-select";
import LocationSearch from "./location-search";
import StatusCheckbox from "./status-selector";

interface ISideFilterProps {
  noStatusFilter?: boolean;
}

const SideFilter: React.FC<ISideFilterProps> = ({ noStatusFilter }) => {
  const { t } = useTranslation();

  return (
    <div className="hidden sm:block space-y-2 bg-white px-2 flex-shrink-0">
      <div className="flex items-center w-[250px]">
        <FilterIcon fill={COLORS.PRIMARY.DEFAULT} className="mr-4" />
        <Typography size="lg" weight="bold" text={t("filter-label")} />
      </div>
      {!noStatusFilter && <StatusCheckbox />}
      <LocationSearch />
      <IndustrySelect />
      <CategorySelect />
      <BudgetRange />
    </div>
  );
};
export default SideFilter;
