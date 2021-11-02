import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { NumInput } from "@components/ui/storybook/inputs/number-input";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";
import Form from "@components/form";
import Button from "@components/ui/storybook/button";

enum EInputFocus {
  MIN,
  MAX,
}

const BudgetRange: React.FC = ({ ...props }) => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();

  const initMinBudget = parseInt(query.minBudget + "");
  const initMaxBudget = parseInt(query.maxBudget + "");

  const [minBudget, setMinBudget] = useState(initMinBudget);
  const [maxBudget, setMaxBudget] = useState(initMaxBudget);
  const [focusingInput, setFocusingInput] = useState<EInputFocus>();

  useEffect(() => {
    function changeQuery() {}

    changeQuery();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minBudget, maxBudget]);

  function handleSubmit() {
    if (!minBudget && !maxBudget) return;
    if (minBudget && maxBudget && minBudget > maxBudget) {
      if (focusingInput === EInputFocus.MIN) setMaxBudget(minBudget);
      else if (focusingInput === EInputFocus.MAX) setMinBudget(maxBudget);
    }

    const { pathname } = router;

    if (minBudget) delete query.minBudget;
    if (!query.maxBudget) delete query.maxBudget;

    router.replace({
      pathname,
      query: {
        ...query,
        ...(minBudget ? { minBudget } : {}),
        ...(maxBudget ? { maxBudget } : {}),
      },
    });
  }

  return (
    <div {...props}>
      <FilterLabel text={t("budgetRange-filter-label")} />
      <Form onSubmit={handleSubmit}>
        <NumInput
          className="mb-4"
          placeholder={t("min")}
          suffix={` ${t("form:budget-sign")}`}
          value={minBudget}
          allowNegative={false}
          onChange={setMinBudget}
          onFocus={() => setFocusingInput(EInputFocus.MIN)}
        />
        <NumInput
          value={maxBudget}
          onChange={setMaxBudget}
          placeholder={t("max")}
          allowNegative={false}
          suffix={` ${t("form:budget-sign")}`}
          onFocus={() => setFocusingInput(EInputFocus.MAX)}
        />
        <Button className="hidden" />
      </Form>
    </div>
  );
};
export default BudgetRange;
