import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { NumInput } from "@components/ui/storybook/inputs/number-input";
import FilterLabel from "./filter-label";
import { useRouter } from "next/dist/client/router";
import Form from "@components/form";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import XIcon from "@assets/icons/x-icon";
import { isLogin } from "@utils/auth-utils";

enum EInputFocus {
  MIN,
  MAX,
}

const BudgetRange: React.FC = ({ ...props }) => {
  const { t } = useTranslation("form");
  const { query, ...router } = useRouter();

  const initMinBudget = parseInt(query.minBudget + "");
  const initMaxBudget = parseInt(query.maxBudget + "");

  const [minBudget, setMinBudget] = useState<number | "">(initMinBudget ?? "");
  const [maxBudget, setMaxBudget] = useState<number | "">(initMaxBudget ?? "");
  const [focusingInput, setFocusingInput] = useState<EInputFocus>();

  useEffect(() => {
    if (!initMinBudget) setMinBudget("");
    if (!initMaxBudget) setMaxBudget("");
  }, [initMinBudget, initMaxBudget]);

  function handleSubmit() {
    if (minBudget === initMinBudget && maxBudget === initMaxBudget) return;
    if (!minBudget && !maxBudget && !initMinBudget && !initMaxBudget) return;
    if (minBudget && maxBudget && minBudget > maxBudget) {
      if (focusingInput === EInputFocus.MIN) setMaxBudget(minBudget);
      else if (focusingInput === EInputFocus.MAX) setMinBudget(maxBudget);
    }

    const { pathname } = router;

    delete query.minBudget;
    delete query.maxBudget;
    router.replace({
      pathname,
      query: {
        ...query,
        ...(minBudget ? { minBudget } : {}),
        ...(maxBudget ? { maxBudget } : {}),
      },
    });
  }

  function removeMinBudget() {
    const { pathname } = router;
    setMinBudget("");

    if (query.minBudget) delete query.minBudget;

    router.replace({
      pathname,
      query,
    });
  }

  function removeMaxBudget() {
    const { pathname } = router;
    setMaxBudget("");

    if (query.maxBudget) delete query.maxBudget;

    router.replace({
      pathname,
      query,
    });
  }

  return (
    <div {...props}>
      <FilterLabel text={`${t("budgetRange-filter-label")}`} />
      <Form onSubmit={handleSubmit} className="space-y-0">
        <div>
          <Typography
            text={`${t("budgetFrom-label")}:`}
            variant="description"
            className="!text-xs"
          />
          <div className="relative">
            {!!minBudget && (
              <span
                className="absolute y-center left-4 cursor-pointer"
                onClick={removeMinBudget}
              >
                <XIcon className="w-3 h-3 " />
              </span>
            )}
            <NumInput
              placeholder={t("min")}
              suffix={` ${t("budget-sign")}`}
              value={minBudget || ""}
              disabled={!isLogin()}
              allowNegative={false}
              onChange={setMinBudget}
              onFocus={() => setFocusingInput(EInputFocus.MIN)}
            />
          </div>
        </div>
        <Typography
          text={`${t("budgetTo-label")}:`}
          variant="description"
          className="!text-xs"
        />
        <div className="relative pb-1">
          {!!maxBudget && (
            <span
              className="absolute y-center left-4 cursor-pointer"
              onClick={removeMaxBudget}
            >
              <XIcon className="w-3 h-3" />
            </span>
          )}
          <NumInput
            value={maxBudget || ""}
            onChange={setMaxBudget}
            placeholder={t("max")}
            disabled={!isLogin()}
            allowNegative={false}
            suffix={` ${t("budget-sign")}`}
            onFocus={() => setFocusingInput(EInputFocus.MAX)}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!isLogin()}
          size="small"
          type="submit"
          className="w-full !bg-secondary-1 mt-1"
        >
          {t("filterBudgetRangeSubmit-button-label")}
        </Button>
      </Form>
    </div>
  );
};
export default BudgetRange;
