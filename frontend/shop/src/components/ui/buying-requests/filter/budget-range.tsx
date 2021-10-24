import { useTranslation } from "next-i18next";
import React from "react";
import Input from "@storybook/input";
import Typography from "@storybook/typography";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import { useForm } from "react-hook-form";

interface IBudgetRangeProps extends React.HTMLAttributes<HTMLDivElement> {}

const BudgetRange: React.FC<IBudgetRangeProps> = ({ className, ...props }) => {
  const { t } = useTranslation();

  const { control } = useForm();

  return (
    <div {...props}>
      <Typography
        text={t("product-filter-label")}
        variant="smallTitle"
        className="mb-4"
      />
      <NumberInput
        control={control}
        name="min-budget"
        className="mb-4"
        placeholder={t("min")}
        suffix={` ${t("form:budget-sign")}`}
      />
      <NumberInput
        control={control}
        name="max-budget"
        placeholder={t("max")}
        suffix={` ${t("form:budget-sign")}`}
      />
    </div>
  );
};
export default BudgetRange;
