import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IVietnamCity, vietnamCities } from "src/datas/vietnam-cities";
import Select from "@components/ui/storybook/inputs/select";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";

const LocationSearch: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();

  const locationFilter = query.location as string;

  const [value, setValue] = useState<IVietnamCity | string>(locationFilter);

  useEffect(() => {
    function setQuery() {
      if (typeof value === "string") return;
      if (!value) delete query.location;

      const { pathname } = router;
      router.replace({
        pathname,
        query: {
          ...query,
          ...(value ? { location: (value as IVietnamCity)?.name } : {}),
        },
      });
    }

    setQuery();
  }, [value]);

  function handleChange(e: IVietnamCity | unknown) {
    setValue(e as IVietnamCity);
  }

  return (
    <div {...props}>
      <FilterLabel text={t("location-filter-label")} />
      <Select
        options={vietnamCities}
        name="locationFilter"
        isClearable
        getInitialValue={(opt) => opt.name === locationFilter}
        value={value}
        onChange={handleChange}
        placeholder={t("locationFilter-placeholder")}
        isSearchable={true}
        getOptionLabel={((opt: IVietnamCity) => opt.name) as any}
        getOptionValue={((opt: IVietnamCity) => opt.name) as any}
      />
    </div>
  );
};
export default LocationSearch;
