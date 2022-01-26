import React from "react";
import { useTranslation } from "react-i18next";
import {
  getVietnamCityByName,
  IVietnamCity,
  vietnamProvinces,
} from "@datas/vietnam-provinces";
import Select from "@components/ui/storybook/inputs/select";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";

const LocationSearch: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();

  const locationFilter = query.location as string;

  function setQuery(location: string) {
    if (!location && query.location) delete query?.location;

    const { pathname } = router;
    router.replace({
      pathname,
      query: {
        ...query,
        ...(!!location ? { location } : {}),
      },
    });
  }

  function handleChange(e: IVietnamCity | any) {
    setQuery(e?.name);
  }

  return (
    <div {...props}>
      <FilterLabel text={t("location-filter-label")} />
      <Select
        options={vietnamProvinces}
        name="locationFilter"
        isClearable
        getInitialValue={(opt) => opt.name === locationFilter}
        value={getVietnamCityByName(locationFilter) || null}
        onChange={handleChange}
        placeholder={`v.d: ${t("locationFilter-placeholder")}`}
        isSearchable={true}
        getOptionLabel={((opt: IVietnamCity) => opt.name) as any}
        getOptionValue={((opt: IVietnamCity) => opt.name) as any}
      />
    </div>
  );
};
export default LocationSearch;
