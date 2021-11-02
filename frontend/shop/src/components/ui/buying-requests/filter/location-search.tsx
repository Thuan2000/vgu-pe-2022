import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IVietnamCity, vietnamCities } from "@utils/vietnam-cities";
import Select from "@components/ui/storybook/inputs/select";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";

interface ILocationSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const LocationSearch: React.FC<ILocationSearchProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();

  const [value, setValue] = useState<IVietnamCity>();

  const locationFilter = query.location;

  useEffect(() => {
    function setQuery() {
      const { pathname } = router;
      router.push({
        pathname,
        query: { ...query, location: (value as IVietnamCity)?.name },
      });
    }

    if (value && typeof value !== "string") setQuery();
  }, [value]);

  function handleChange(e: IVietnamCity | unknown) {
    setValue(e as IVietnamCity);
  }

  return (
    <div {...props}>
      <FilterLabel text={t("location-filter-label")} />
      <Select
        options={vietnamCities}
        isClearable
        getInitialValue={(opt) => opt.slug === locationFilter}
        value={value || locationFilter}
        onChange={handleChange}
        isSearchable
        getOptionLabel={((opt: IVietnamCity) => opt.name) as any}
        getOptionValue={((opt: IVietnamCity) => opt.name) as any}
      />
    </div>
  );
};
export default LocationSearch;
