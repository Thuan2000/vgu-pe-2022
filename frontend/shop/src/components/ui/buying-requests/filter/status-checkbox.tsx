import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "@storybook/checkbox";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";

interface IStatusProps extends React.HTMLAttributes<HTMLDivElement> {}

const StatusCheckbox: React.FC<IStatusProps> = ({ ...props }) => {
  const { t } = useTranslation();

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>();
  const [isCloseFilter, setIsCloseFilter] = useState<boolean>();

  const { query, ...router } = useRouter();

  useEffect(() => {
    function getStatus() {
      if (
        (isOpenFilter && isCloseFilter) ||
        (!isOpenFilter && !isCloseFilter)
      ) {
        return "ALL";
      }
      if (isOpenFilter) return "OPEN";
      if (isCloseFilter) return "CLOSE";
    }

    function setQuery() {
      const { pathname } = router;

      router.replace({
        pathname,
        query: { ...query, status: getStatus() },
      });
    }

    // setQuery();
  }, [isOpenFilter, isCloseFilter]);

  function handleOpenChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setIsOpenFilter(true);
    else setIsOpenFilter(false);
  }

  function handleCloseChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setIsCloseFilter(true);
    else setIsCloseFilter(false);
  }

  return (
    <div {...props}>
      <FilterLabel text={t("status-filter-label")} />
      <Checkbox
        className="mb-2"
        name="open-status"
        label={t("filter-status-open-filter")}
        onChange={handleOpenChange}
      />
      <Checkbox
        name="close-status"
        onChange={handleCloseChange}
        label={t("filter-status-close-filter")}
      />
    </div>
  );
};
export default StatusCheckbox;
