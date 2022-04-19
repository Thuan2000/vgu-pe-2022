import FilterIcon from "@assets/icons/filter-icon";
import IndustrySelect from "@components/ui/common-filter/industry-select";
import LocationSearch from "@components/ui/common-filter/location-search";
import Typography from "@components/ui/storybook/typography";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import DateFilter from "./date-filter";

interface ICompanySideFilterProps {
  noStatusFilter?: boolean;
}

const CompanySideFilter: React.FC<ICompanySideFilterProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <div className="hidden sm:block space-y-2 bg-white px-2 flex-shrink-0">
      <div className="flex items-center w-[250px]">
        <FilterIcon fill={COLORS.PRIMARY.DEFAULT} className="mr-4" />
        <Typography
          className="text-lg"
          text={t("filter-label")}
          variant="special-heading"
        />
      </div>
      <LocationSearch />
      <IndustrySelect />
      <DateFilter />
    </div>
  );
};
export default CompanySideFilter;
