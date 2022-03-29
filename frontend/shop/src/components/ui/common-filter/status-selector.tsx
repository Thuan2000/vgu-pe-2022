import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";
import { IBrStatus } from "@graphql/types.graphql";
import Button from "@components/ui/storybook/button";
import { isLogin } from "@utils/auth-utils";

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

  type Status = "ALL" | "CLOSE" | "OPEN";

  type IStatus = {
    label: string;
    status: Status;
  };

  const statuses: IStatus[] = [
    {
      label: "statusAll-filter",
      status: "ALL",
    },
    {
      label: "statusOpen-filter",
      status: "OPEN",
    },
    {
      label: "statusClose-filter",
      status: "CLOSE",
    },
  ];

  const ROUND_CLASS = {
    [1]: "rounded-tr-none rounded-br-none",
    [2]: "rounded-none",
    [3]: "rounded-tl-none rounded-bl-none",
  };

  return (
    <div {...props}>
      <FilterLabel text={t("status-filter-label")} />
      <div className="flex w-full">
        {statuses.map((s, idx) => {
          const isActive = statusFilter === s.status;
          const roundClass = (ROUND_CLASS as any)[idx + 1];
          const extraClass = isActive ? activeClass : "";
          return (
            <Button
              key={s.label + s.status + "key-s"}
              variant="custom"
              size="small"
              onClick={() => filterStatus(s.status)}
              className={`w-1/3 ${SAME_CLASS} ${roundClass} ${extraClass}`}
            >
              {t(s.label)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
export default StatusCheckbox;
