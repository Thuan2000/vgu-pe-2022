import React, { useState, useEffect } from "react";

import { useTranslation } from "next-i18next";
import Select from "@components/ui/storybook/inputs/select";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";
import {
  getIndustryByLabel,
  getIndustryBySlug,
  IIndustry,
  industriesData,
} from "@datas/industries";

interface IIndustrySelectProps extends React.HTMLAttributes<HTMLDivElement> {}

const IndustrySelect: React.FC<IIndustrySelectProps> = ({
  className,
  ...props
}) => {
  const { t } = useTranslation();

  const { query, ...router } = useRouter();
  const industryFilter = query.industry as string;

  function setQuery(industry?: string) {
    if (!industry && query.industry) delete query?.industry;

    const { pathname } = router;
    router.replace({
      pathname,
      query: {
        ...query,
        ...(!!industry ? { industry } : {}),
      },
    });
  }

  function handleChange(e: IIndustry | any) {
    setQuery(e?.label);
  }

  return (
    <div {...props}>
      <FilterLabel text={t("industry-filter-label")} />
      <Select
        options={industriesData || []}
        name="industryFilter"
        isClearable
        value={getIndustryByLabel(industryFilter) || null}
        getInitialValue={(opt: IIndustry) => opt.slug === industryFilter}
        placeholder={t("industryFilter-placeholder")}
        onChange={handleChange}
        getOptionValue={((option: IIndustry) => option?.slug) as any}
        getOptionLabel={
          ((option: IIndustry) => t("industry:" + option?.label)) as any
        }
      />
    </div>
  );
};
export default IndustrySelect;
