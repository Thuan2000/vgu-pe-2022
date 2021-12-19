import { Datepicker } from "@components/ui/storybook/inputs/date-input";
import { IIndustry } from "@graphql/types.graphql";
import { viDateFormat, viFormatDateToOriginalDate } from "@utils/functions";
import { replace } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

interface IDateFilterProps {}

const DateFilter: React.FC<IDateFilterProps> = ({}) => {
  const { t } = useTranslation();

  const { query, ...router } = useRouter();
  const dateFilter = query.establishment as any;

  function setQuery(establishment?: string) {
    console.log(establishment);
    if (!establishment && query.establishment) delete query?.establishment;

    const { pathname } = router;
    router.replace({
      pathname,
      query: {
        ...query,
        ...(!!establishment ? { establishment } : {}),
      },
    });
  }

  function handleChange(e: Date) {
    setQuery(!!e ? viDateFormat(e?.getTime()) : "");
  }

  return (
    <div>
      <Datepicker
        {...(!!dateFilter
          ? { value: viFormatDateToOriginalDate(dateFilter) as any }
          : {})}
        label={t("min-establishmentDate-filter-label")}
        placeholderText={t("establishmentDate-filter-placeholder")}
        onChange={handleChange}
        isClearable
      />
    </div>
  );
};
export default DateFilter;
