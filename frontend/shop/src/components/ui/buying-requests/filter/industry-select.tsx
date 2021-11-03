import React, { useState, useEffect } from "react";

import { useIndustriesQuery } from "@graphql/industry.graphql";
import { useTranslation } from "next-i18next";
import { IIndustry } from "@graphql/types.graphql";
import Select from "@components/ui/storybook/inputs/select";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";

interface IIndustrySelectProps extends React.HTMLAttributes<HTMLDivElement> {}

const IndustrySelect: React.FC<IIndustrySelectProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation();

  const { query, ...router } = useRouter();
  const industryFilter = query.industry as string;
  const [value, setValue] = useState<IIndustry | string>(industryFilter);

  useEffect(() => {
    function setQuery() {
      if (typeof value === "string") return;
      if (!value) delete query.industry;

      const { pathname } = router;

      router.push({
        pathname,
        query: {
          ...query,
          ...(value ? { industry: (value as IIndustry)?.slug } : {}),
        },
      });
    }

    setQuery();
  }, [value]);

  function handleChange(e: IIndustry | unknown) {
    setValue(e as IIndustry);
  }

  const { data } = useIndustriesQuery();
  const industries = data?.industries;
  return (
    <div {...props}>
      <FilterLabel text={t("industry-filter-label")} />
      <Select
        options={industries || []}
        name="industryFilter"
        isClearable
        value={value}
        getInitialValue={(opt: IIndustry) => opt.slug === industryFilter}
        placeholder={t("industryFilter-placeholder")}
        onChange={handleChange}
        getOptionValue={((option: IIndustry) => option?.slug) as any}
        getOptionLabel={((option: IIndustry) => option?.name) as any}
      />
    </div>
  );
};
export default IndustrySelect;
