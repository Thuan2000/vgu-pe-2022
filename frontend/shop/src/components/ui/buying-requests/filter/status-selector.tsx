import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";
import { IBrStatus } from "@graphql/types.graphql";
import Button from "@components/ui/storybook/button";

interface IStatusProps extends React.HTMLAttributes<HTMLDivElement> {}

const StatusCheckbox: React.FC<IStatusProps> = ({ ...props }) => {
  const { t } = useTranslation();

  const { query, ...router } = useRouter();

  const [statusFilter, setStatusFilter] = useState<IBrStatus>(
    (query.status as IBrStatus) || "ALL"
  );

  useEffect(() => {
    function setQuery() {
      if (statusFilter === "ALL" && !query.status) return;
      const { pathname } = router;

      router.replace({
        pathname,
        query: { ...query, ...(statusFilter ? { status: statusFilter } : {}) },
      });
    }

    setQuery();
  }, [statusFilter]);

  const SAME_CLASS =
    "py-1 w-20 border-primary border-1 text-primary duration-100 focus:text-white !shadow-none focus:ring-none";
  const activeClass = "bg-primary !text-white";

  function filterStatus(status?: IBrStatus) {
    setStatusFilter(status || "ALL");
    if (status === "ALL") delete query.status;
    else query.status = status;
    const { pathname } = router;

    router.push(
      {
        pathname,
        query,
      },
      undefined,
      {
        scroll: false,
      }
    );
  }

  return (
    <div {...props}>
      <FilterLabel text={t("status-filter-label")} />
      <div className="flex">
        <Button
          variant="custom"
          size="small"
          onClick={() => filterStatus("ALL")}
          className={`${SAME_CLASS} rounded-tr-none rounded-br-none ${
            statusFilter === "ALL" ? activeClass : ""
          }`}
        >
          {t("statusAll-filter")}
        </Button>
        <Button
          variant="custom"
          size="small"
          onClick={() => filterStatus("OPEN")}
          className={`${SAME_CLASS} rounded-none ${
            statusFilter === "OPEN" ? activeClass : ""
          }`}
        >
          {t("statusOpen-filter")}
        </Button>
        <Button
          variant="custom"
          onClick={() => filterStatus("CLOSE")}
          size="small"
          className={`${SAME_CLASS} rounded-tl-none rounded-bl-none ${
            statusFilter === "CLOSE" ? activeClass : ""
          }`}
        >
          {t("statusClose-filter")}
        </Button>
      </div>
    </div>
  );
};
export default StatusCheckbox;
