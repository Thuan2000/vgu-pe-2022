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
  const [value, setValue] = useState<IIndustry>();

  const { query, ...router } = useRouter();
  const industryFilter = query.industry;

  useEffect(() => {
    function setQuery() {
      const { pathname } = router;

      router.push({
        pathname,
        query: { ...query, industry: (value as IIndustry)?.id },
      });
    }

    if (value && typeof value !== "string") setQuery();
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
        name="industry"
        isClearable
        getInitialValue={(opt: IIndustry) => opt.slug === industryFilter}
        onChange={handleChange}
        getOptionValue={((option: IIndustry) => option?.name) as any}
        getOptionLabel={((option: IIndustry) => option?.name) as any}
      />
    </div>
  );
};
export default IndustrySelect;
